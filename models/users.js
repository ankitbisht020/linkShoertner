const mongoose = require("mongoose");

const urlSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
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
    visitHistory:[
        {
            type:Date,
            default:Date.now
        }
    ]
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("users",urlSchema);