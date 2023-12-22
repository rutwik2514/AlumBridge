const express = require("express");
const profileModel = require("../models/profile_model");

const getProfile = async (req, res) => {
    console.log("Came here", req.body);
    const profile = await profileModel.find({ email: req.body.email });
    if (profile) {
        return res.status(200).json({ msg: "Person found", profile: profile });
    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' });
    }

}


const makeProfile = async (req, res) => {
    console.log("creating profile");
    const profile = req.body.data;
    const recentConnections = {
        connectionName: "",
        connectionProfileLink: "",
    }
    console.log("hi", profile.email);
    profileModel
        .create({ email: profile.email, name: profile.name, bio: profile.bio, whatsappNumber: profile.whatsappNumber, numberOfConnections: profile.numberOfConnections, recentOpenings: profile.recentOpenings, recentStories: profile.recentStories, connectionRequests: profile.connectionRequests, sentConnectionRequests: profile.sentConnectionRequests, recentConnections: recentConnections })
        .then(() => {
            console.log("Profile")
            return res.status(200).json({ msg: "Registeration successfull" });
        }).catch((err) => {
            console.log(err);
            return res.status(404).json({ msg: "Something went wrong" });
        })
}


const findProfile = async (req, res) => {
    // const name = req.body;
    console.log("Came here0", req.body.name);
    const profile = await profileModel.find({ name: req.body.name });
    console.log("profile is", profile);
    return res.status(200).json({ profile: profile });
}


const sendConnectionRequest = async (req, res) => {
    const { to, from } = req.body;
    const profileTo = await profileModel.find({ email: to });
    var { _id, email, name, bio, whatsappNumber, numberOfConnections, recentOpenings, recentStories, connectionRequests, sentConnectionRequests, recentConnections } = profileTo[0];
    let currentConnectionRequests = connectionRequests;
    let currentRecentConnections = recentConnections;
    for(var i = 0; i < currentRecentConnections.length; i++){
        if(i>0 && currentRecentConnections[i].connectionEmail==from){
            return res.status(400).json({ "msg": "Already Connected" });
            
        }
    }
    for (var i = 0; i < currentConnectionRequests.length; i++) {
        if (i > 0 && currentConnectionRequests[i].connectionEmailFrom == from) {
            return res.status(400).json({ "msg": "Request Already Sent" });
        }
    }
    currentConnectionRequests.push({
        connectionEmailFrom: from,
        isConnected: false,
    });
    try {
        await profileModel.findByIdAndUpdate({ _id }, {
            email,
            name,
            bio,
            whatsappNumber,
            numberOfConnections,
            recentOpenings,
            recentStories,
            connectionRequests: currentConnectionRequests,
            sentConnectionRequests,
            recentConnections
        })
        const profileFrom = await profileModel.find({ email: from });
        var { _id, email, name, bio, whatsappNumber, numberOfConnections, recentOpenings, recentStories, connectionRequests, sentConnectionRequests, recentConnections } = profileFrom[0];

        let currentSentConnectionRequests = sentConnectionRequests;
        currentSentConnectionRequests.push({
            connectionEmailTo: to,
        });
        await profileModel.findByIdAndUpdate({ _id }, {
            email,
            name,
            bio,
            whatsappNumber,
            numberOfConnections,
            recentOpenings,
            recentStories,
            connectionRequests,
            sentConnectionRequests: currentSentConnectionRequests,
            recentConnections
        },)
        return res.status(200).json({ "msg": "Sent Successfully" });
    }
    catch (err) {
        return res.status(400).json({ "msg": `${err}` });
    }
}



const acceptConnectionRequest = async (req, res) => {

    const { from, to } = req.body;

    //updating profile to whom connection request was sent
    const profileTo = await profileModel.find({ email: to });
    const currentConnectionRequests = profileTo[0].connectionRequests;
    let flag = -1;
    for (var i = 0; i < currentConnectionRequests.length; i++) {
        if (i > 0 && currentConnectionRequests[i].connectionEmailFrom == from) {
            flag = i;
            currentConnectionRequests[i].isConnected = true;
        }
    }
    if (flag == -1) {
        return res.status(400).json({ "msg": "Connection Request Does not Exsist" });
    }
    else {
        console.log("accceppting req");
        //remove flag indexed element from connection requests;
        const profileFrom = await profileModel.find({ email: from })
        var { _id, email, name, bio, whatsappNumber, numberOfConnections, recentOpenings, recentStories, connectionRequests, sentConnectionRequests, recentConnections } = profileTo[0];
        var currentRecentConnections = recentConnections;
        //added to recent connections
        currentRecentConnections.push({
            connectionEmail: profileFrom[0].email,
        })
        //remove from connection requests
        currentConnectionRequests.splice(flag, 1);
        //check in sent connection requests; and remove
        var currentSentConnectionRequests = sentConnectionRequests;
        var idx = -1;
        for (var i = 0; i < currentSentConnectionRequests; i++) {
            if (currentSentConnectionRequests[i].connectionEmailTo == from) {
                idx = i;
            }
        }
        if (idx > -1) {
            currentSentConnectionRequests.splice(idx, 1);
        }
        //update to whom connection request is sent
        try {
            await profileModel.findByIdAndUpdate({ _id }, {
                email,
                name,
                bio,
                whatsappNumber,
                numberOfConnections : numberOfConnections + 1,
                recentOpenings,
                recentStories,
                connectionRequests: currentConnectionRequests,
                sentConnectionRequests: currentSentConnectionRequests,
                recentConnections: currentRecentConnections
            },)

            //updating profile from whom connection request was sent
            var { _id, email, name, bio, whatsappNumber, numberOfConnections, recentOpenings, recentStories, connectionRequests, sentConnectionRequests, recentConnections } = profileFrom[0];
            //insert in froms connection request
            var currentRecentConnectionsFrom = recentConnections;
            currentRecentConnectionsFrom.push({
                connectionEmail:to
            })
            //remove from sent connection request;
            var currentSentConnectionRequestsFrom = sentConnectionRequests;
            var idx = -1;
            for(var i = 0; i < currentSentConnectionRequestsFrom.length; i++){
                if(i>0 && currentSentConnectionRequestsFrom[i].connectionEmailTo == to){
                    idx = i;
                }
            }
            if(idx>-1){
                currentSentConnectionRequestsFrom.splice(idx,1);
            }
            //remove from connection requests;
            var currentConnectionRequestsFrom = connectionRequests;
            idx = -1;
            for(var i =0; i < currentConnectionRequestsFrom.length; i++){
                if(i>0 && currentConnectionRequestsFrom[i].connectionEmailFrom == to){
                    idx=i;
                }
            }
            if(idx>-1)
            currentConnectionRequestsFrom.splice(idx,1);
            try{
                await profileModel.findByIdAndUpdate({ _id }, {
                    email,
                    name,
                    bio,
                    whatsappNumber,
                    numberOfConnections: numberOfConnections+1,
                    recentOpenings,
                    recentStories,
                    connectionRequests: currentConnectionRequestsFrom,
                    sentConnectionRequests: currentSentConnectionRequestsFrom,
                    recentConnections: currentRecentConnectionsFrom
                },)
                res.status(200).json({"msg":"Connection Request Accepted"});
            }
            catch(err){
            res.status(400).json({ "msg": `hello ${err}` });

            }
        }
        catch (err) {
            res.status(400).json({ "msg": `hi ${err}` });
        }
        // return res.status(200).json({ "msg": "Sent Successfully" });
    }

}

const isConnected = async(req,res) =>{
    const {to,from} = req.body;
    console.log("Checkng if connected",to,from)
    const profileFrom = await profileModel.find({email:from});
    for(var i  = 0; i < profileFrom[0].recentConnections.length; i++){
        if(i>0 && profileFrom[0].recentConnections[i].connectionEmail == to){
        // console.log("checking",profileFrom[0].recentConnections[i].connectionEmail);

            const profileTo = await profileModel.find({email:to});
            return res.status(200).json({"msg": "Yes, You both are connected", "profile" : `${profileTo}`});
        }
    }
    return res.status(400).json({"msg":"You both are not connected"});
}
//gives connection request
const getRecentConnections = async(req,res) =>{
    const {to}=req.body;
    console.log("came to recent", to);
    const profileTo = await profileModel.find({email:to});
    return res.status(200).json({"connectionRequests": profileTo[0].connectionRequests});
}
const getAcceptedConnections = async(req,res)=>{
    const {to}=req.body;
    const profileTo = await profileModel.find({email:to});
    return res.status(200).json({"Accepted": profileTo[0].recentConnections});
}

module.exports = {
    getProfile,
    makeProfile,
    findProfile,
    sendConnectionRequest,
    acceptConnectionRequest,
    isConnected,
    getRecentConnections,
    getAcceptedConnections
};