const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connecttomongo = () => {
    mongoose.connect(mongoURL , () => {
        console.log("connected to mongodb server");
    })
}

module.exports = connecttomongo;