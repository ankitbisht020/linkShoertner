const shortid = require('shortid'); // For generating short URL codes
const crypto = require('crypto');
const urlmodel = require('../models/urlmodel');
const contact = require('../models/servicesupport');
const jwt = require('jsonwebtoken');
const app = require('..');




exports.homepage = async (req, res) => {
    let decode = null;
    
    // Check if the token exists in cookies
    if (req.cookies.token) {
        try {
            // Verify JWT token
            decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            // console.log(decode); // Optional: Log the decoded user info
        } catch (err) {
            console.error('JWT verification failed:', err);
            // You can choose to redirect or just log the error
        }
    }
    
    res.render('index', { shortenedUrl: null, decode });
};
exports.shorten= async (req, res) => {
    let decode = null;
    
    // Check if the token exists in cookies
    if (req.cookies.token) {
        try {
            // Verify JWT token
            decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            // console.log(decode); // Optional: Log the decoded user info
        } catch (err) {
            console.error('JWT verification failed:', err);
            // You can choose to redirect or just log the error
        }
    }
    let originalurl= req.body.url;
    let Url =await urlmodel.findOne({redirectURL:originalurl});

    if(!decode){
    if(!Url){
        const shortUrlCode=Url.shortId;
        const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;   
        res.render('index', {shortenedUrl,shortUrlCode, decode});
    }else{
        const shortUrlCode = shortid.generate();
        await urlmodel.create({
            shortId:shortUrlCode,
            redirectURL:originalurl
        });
        const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;
        res.render('index', {shortenedUrl,shortUrlCode, decode});
    }
    }else{
        
        let email=decode.email;
        if(email==Url.email){
            const shortUrlCode=Url.shortId;
            const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;   
            res.render('index', {shortenedUrl,shortUrlCode, decode});
        }else{
            // console.log(email);
            let url = await urlmodel.findOne({redirectURL:originalurl,email});
            if(!url){
                const shortUrlCode = shortid.generate();
                await urlmodel.create({
                    shortId:shortUrlCode,
                    redirectURL:originalurl,
                    email
                });
                const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;
                res.render('index', {shortenedUrl,shortUrlCode, decode});
            }else{
                // console.log(email);
                const shortUrlCode=url.shortId;
                const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;   
                res.render('index', {shortenedUrl,shortUrlCode, decode});
            }
        }
    }
}
 

exports.redirectolink =async (req, res) => {
   
    const shortUrlCode = req.params.code;
    let data =  await urlmodel.findOne({shortId:shortUrlCode});
     // Check if the data exists
     if (data && data.redirectURL) {
        // Redirect to the original URL
        res.redirect(data.redirectURL);
    } else {
        res.status(404).send('URL kese milega ');
    }
        // Send a 404 response if the URL is not found
      
}

exports.contactpage=(req,res)=>{
    let decode = null;
    
    // Check if the token exists in cookies
    if (req.cookies.token) {
        try {
            // Verify JWT token
            decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            // console.log(decode); // Optional: Log the decoded user info
        } catch (err) {
            console.error('JWT verification failed:', err);
            // You can choose to redirect or just log the error
        }
    }
    const alertMessage = req.query.alert || null;
    res.render('contact',{alertMessage, decode})
}

exports.usercontact= async(req,res)=>{
    const { name, email, phone, message } = req.body;
    let decode = null;
    
    // Check if the token exists in cookies
    if (req.cookies.token) {
        try {
            // Verify JWT token
            decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            // console.log(decode); // Optional: Log the decoded user info
        } catch (err) {
            console.error('JWT verification failed:', err);
            // You can choose to redirect or just log the error
        }
    }

    let usercontacts=await contact.findOne( {
      
        $or: [
        { phone },
        { email }
    ]});
    if(usercontacts){
      
        req.flash('error', 'You have already submitt a requst! Our team will contact you soon.');
        return res.redirect('/contact');

    }else{
    try{
      await contact.create(
        {       
            name:name,
            phone:phone,
            email:email,
            message:message,
            visitHistory:new Date()
        });
        
        req.flash('success', 'Thank you for contacting us! Our team will contact you soon.');
        return res.redirect('/contact');
        
    }catch(error){
        res.send("some error occur at our side.");
    }
}}

exports.about = (req,res)=>{
    let decode = null;
    
    // Check if the token exists in cookies
    if (req.cookies.token) {
        try {
            // Verify JWT token
            decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            // console.log(decode); // Optional: Log the decoded user info
        } catch (err) {
            console.error('JWT verification failed:', err);
            // You can choose to redirect or just log the error
        }
    }
    res.render('about',{decode});
}

exports.showhistory= async(req,res)=>{
   let  decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);   
   let email = decode.email;
   let data = await urlmodel.find({email})
   res.json(data);
    
}



