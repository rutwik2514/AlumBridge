const express = require("express");
// const company = require("../models/company_model");
const storiesModel = require("../models/stories_model");
const profileModel = require("../models/profile_model")
const getStory=async(req,res)=>{
    let stories = await storiesModel.find({});
    console.log(stories);
    if(stories){
        return res.status(200).json({stories:stories});
    }
    return res.status(400);
}
const createStory=async(req,res)=>{
    const {story,from} = req.body.data; 
    
    if(story != null){
        const profile = await profileModel.find({email:from});
        console.log("Profike is", profile);
        console.log("came to create story");
        storiesModel.create({story:story, author:`${profile[0].name}`})
        .then(()=>{
            console.log("Story Created");

        })
        .catch(()=>{
            console.log("something went wrong");
            return res.status(400).json({msg:"Something went wrong"});
        })
        var { _id , email, name, bio, whatsappNumber, numberOfConnections, recentOpenings, recentStories, connectionRequests, sentConnectionRequests, recentConnections } = profile[0];
        let currentRecentStories = recentStories;
        currentRecentStories.push({
            storyDescription:story

        })
        try{
            await profileModel.findByIdAndUpdate({ _id }, {
                email,
                name,
                bio,
                whatsappNumber,
                numberOfConnections,
                recentOpenings,
                recentStories:currentRecentStories,
                connectionRequests,
                sentConnectionRequests,
                recentConnections
            },)
            return res.status(200).json({msg:"Story Created"});
        }
        catch(err){
            return res.status(404).json({msg:"something went wrong"});
        }

        

    
    }
    else{
    return res.status(404).json({msg:"something went wrong"});
    }
}

module.exports = {
    getStory,
    createStory
};