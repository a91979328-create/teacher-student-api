const mongoose = require("mongoose");

const dotenv= require("dotenv")
dotenv.config();

const mongodb = process.env.MONGODB_URI

const connectDB = async () => { 
    mongoose.connect(mongodb)
.then( () => console.log("MONGODB connected"))
.catch( (error) => console.log(error.message))
}

module.exports =  connectDB 