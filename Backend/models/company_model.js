const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    companyName:{
        type:"String",
    },
    batchEligible:{
        type:"String"
    },
    title:{
        type:"String",
    },
    applyLink:{
        type:"String",
    }
})
module.exports = mongoose.model("company", schema);