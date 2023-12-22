const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const authentication  = require("../models/auth_model");


const register = async (req,res) =>{
    const {email,password,confirmPassword} = req.body;
    if(password!==confirmPassword){
        return res.status(403).json({msg:"Password and Confirm Password does not match"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const profile = {
        email,
        hashedPassword
    }
    authentication
    .create({email,password:hashedPassword})
    .then(()=>{
        console.log("user created successfully")
        return res.status(200).json({msg:"Registeration successfull"});
    }).catch((err)=>{
        console.log(err);
        return res.status(404).json({msg:"User already found with this email-id"});
    })

}
const login = async(req,res)=>{
    const {email,password}=req.body;
    const profile = await authentication.find({email});
    if(profile.length ==0){
        return res.status(400).json({msg:"User not found"});
    }
    if(await bcrypt.compare(password,profile[0].password)){
        return res.status(200).json({msg:"Login successful", email:profile[0].email});
    }
    return res.status(400).json({msg:"Email and Password Does not match"});

}

module.exports = {
    register,
    login
};
