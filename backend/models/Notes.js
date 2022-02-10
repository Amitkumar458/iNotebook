const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const Notesschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
      type:String,
      default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const notesdata = mongoose.model("notes" , Notesschema);
module.exports = notesdata;