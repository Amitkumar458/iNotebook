const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const Todeschema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    value:{
        type:Array
    }
});

const todomodel = mongoose.model("Todelist" , Todeschema);

module.exports = todomodel;