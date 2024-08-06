const mongoose = require("mongoose")
require('dotenv').config()
mongoose.set("strictQuery", true)
const MONGODB_URL = process.env.MONGODB_URL

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log("Failed to connect to MongoDB:" + err)
    }
}
module.exports = {connect}

