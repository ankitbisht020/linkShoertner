require('dotenv').config();
const MONGO_URL=process.env.MONGO_URL
const mongoUri = process.env.MONGO_URI; ;

const mongoose = require('mongoose');
 
const connection =async()=>{
    try{
        mongoose.connect(mongoUri)
        console.log("Mongodb connected!");
    }catch{
        console.log("Mongodb can't connected!");
    }
}
module.exports =connection;