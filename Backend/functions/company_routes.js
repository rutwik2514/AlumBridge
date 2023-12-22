const express = require("express");
const company = require("../models/company_model");
const profileModel = require("../models/profile_model")
const getCompany=async(req,res)=>{
    let companies = await company.find({});
    console.log(companies);
    if(companies){
        return res.status(200).json({companies:companies});
    }
    return res.status(400);
}
const createCompany=async(req,res)=>{
    const {companyName, batchEligible,title,applyLink,from} = req.body.data; 
    // const profile = req.body.data
    console.log("Coming here",req.body.data);
    // console.log("createing company", companyData);
    if(companyName != null){
        console.log("came to create company");
        // console.log("name is ",companyData.companyName);
        company.create({companyName:companyName, batchEligible:batchEligible, title:title, applyLink:applyLink})
        .then(()=>{
            console.log("company Created");

        })
        .catch(()=>{
            console.log("something went wrong");
            return res.status(400).json({msg:"Something went wrong"});
        })
        const profile = await profileModel.find({email:from});
        var { _id, email, name, bio, whatsappNumber, numberOfConnections, recentOpenings, recentStories, connectionRequests, sentConnectionRequests, recentConnections } = profile[0];
        let currentRecentOpenings = recentOpenings;
        currentRecentOpenings.push({
            companyName:companyName,
            batchEligible:batchEligible,
            title:title,
            applyLink:applyLink
        })
        try{
            await profileModel.findByIdAndUpdate({ _id }, {
                email,
                name,
                bio,
                whatsappNumber,
                numberOfConnections,
                recentOpenings : currentRecentOpenings,
                recentStories,
                connectionRequests,
                sentConnectionRequests,
                recentConnections
            },)
            return res.status(200).json({msg:"Company Created"});
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
    getCompany,
    createCompany
};