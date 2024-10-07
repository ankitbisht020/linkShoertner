const mongoose = require("mongoose");

const urlSchema =new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    email:{
        type:String,
        default:""
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
module.exports = mongoose.model("url",urlSchema);