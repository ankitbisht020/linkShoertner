const { Mongoose, Types } = require("mongoose");

Mongoose.connect
const urlSchema =new Mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{time:Number}}],
    },
    {timestamp: true}
);
module.exports = Mongoose.model("URL",urlSchema);