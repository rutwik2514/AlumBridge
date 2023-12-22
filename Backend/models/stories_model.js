const mongoose = require("mongoose");
const schema = new mongoose.Schema({
   story:{
        type:"String",
   },
   author:{
      type:"String"
   }
})
module.exports = mongoose.model("stories", schema);