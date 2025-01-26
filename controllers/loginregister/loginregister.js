require('dotenv').config();
const urlmodel = require('../../models/urlmodel');
const users = require('../../models/users');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

const secret_key = process.env.SECRET_KEY;
exports.createuser= async(req,res)=>{
    const {name,email,password} = req.body;
    try{
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await users.create({
        name,
        email,
        password: hashedPassword,
    });
        let token =jwt.sign({email: email, userid:users._id},secret_key);
        // Set the token in a cookie
        res.cookie("token",token,{ httpOnly: true });
        // req.flash('success', 'User created succsesfully!');
        res.redirect('/');
        
    }catch(error){
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user.");
        console.log("erreo00");
        // req.flash('error', 'Somthing went wrong at our side!');
    }    
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
        console.error("Error creating user:", error);
        console.log("user not find");
        res.redirect('/');
    }

}

exports.logout = async(req,res)=>{
    res.cookie('token',"");
    res.redirect('/');
}

exports.delete =async(req,res)=>{
    let id= req.params.id;
     await urlmodel.findOneAndDelete({_id:id});
     res.redirect('/');

}