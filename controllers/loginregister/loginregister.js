require('dotenv').config();
const urlmodel = require('../../models/urlmodel');
const users = require('../../models/users');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

const secret_key = process.env.SECRET_KEY;
exports.createuser= async(req,res)=>{
    const {name,email,password} = req.body;
    await bcrypt.hash(password,5,async(req,hashedpassword)=>{
    try{
     await users.create({
        name,
        email,
        password:hashedpassword
    })
        let token =jwt.sign({email: email, userid:users._id},secret_key);
        res.cookie("token",token,{ httpOnly: true });
        // req.flash('success', 'User created succsesfully!');
        res.redirect('/');
        
    }catch{
        console.log("erreo00");
        // req.flash('error', 'Somthing went wrong at our side!');
    }    


});
}

exports.login = async(req,res)=>{
    const {email,password}=req.body;
    let user = await users.findOne({email});
    
    if(user){
        bcrypt.compare(password,user.password, function(err,result){
            if(result){
                let token =jwt.sign({email,user:users._id},secret_key);
                res.cookie('token',token,{httpOnly:true});
                req.flash('successMessage', 'Loged In succsesfully!');
                res.redirect('/');
            }else{
                console.log("password is wrong");
            }
        })
    }else{
        console.log("user not find");
        res.redirect('/');
    }

}

exports.logout = async(req,res)=>{
    res.cookie('token',"");
    res.redirect('/');
}