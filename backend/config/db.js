const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URI)
        console.log("mongo connect")
    } catch (error) {
        console.log(error)
        process.exit()
        
    }
}






module.exports = connectDB