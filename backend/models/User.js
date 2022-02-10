const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const userdata = mongoose.model("user" , userSchema);

module.exports = userdata;