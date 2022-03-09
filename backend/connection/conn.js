require('dotenv').config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;

const connecttomongo = () => {
    mongoose.connect(mongoURL , () => {
        console.log("connected to mongodb server");
    })
}

module.exports = connecttomongo;