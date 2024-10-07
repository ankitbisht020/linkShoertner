const mongoose = require("mongoose");

const urlSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
          type:String,
          required:false
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
module.exports = mongoose.model("contact",urlSchema);