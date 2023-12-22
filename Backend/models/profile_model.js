const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Must provide email."],
        unique: [true, "Must provide unique email id"]
    },
    name:{
        type: String,
        required: [true, "Must provide  name."],
    },
    bio: {
        type: String,
        required: [true, "Must provide bio"],
        
    },
    whatsappNumber:{
        type : Number,
        required: [true, "Must provide Whatsapp Number"],
    },
    numberOfConnections:{
        type:Number
    },
    recentOpenings:[{
        companyName:{
            type:String,
        },
        batchEligible:{
            type:String
        },
        title:{
            type:String,
        },
        applyLink:{
            type:String,
        }
    }],
    recentStories: [{
        storyDescription:{
            type: String,
        }
    }],
    connectionRequests:[{
        connectionEmailFrom:{
            type:String,
        },
        isConnected:{
            type:Boolean,
        }
        
    }],
    sentConnectionRequests:[{
        connectionEmailTo:{
            type:String,
        },
    }],
    recentConnections:[{
        connectionEmail:{
            type:String,
        },
    }]
})
module.exports = mongoose.model("profile", schema);