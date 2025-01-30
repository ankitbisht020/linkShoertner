const shortid = require('shortid'); // For generating short URL codes
const crypto = require('crypto');
const urlmodel = require('../models/urlmodel');
const contact = require('../models/servicesupport');
const jwt = require('jsonwebtoken');
const app = require('../app');




exports.homepage = async (req, res) => {
    let decode = null;
    const hostname = req.get('host');
    console.log("load on homepage");
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
    
    res.render('index', { shortenedUrl: null, decode,hostname });
};
exports.shorten= async (req, res) => {
    let originalUrl= req.body.url;
    let decode = null;
    const hostname = req.get('host');
    
    // Check if the token exists in cookies
    if (req.cookies.token) {
        try {
            // Verify JWT token
            decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            // console.log(decode); 
        } catch (err) {
            console.error('JWT verification failed:', err);
            // You can choose to redirect or just log the error
        }
    }
    try {
        let existingUrl = await urlmodel.findOne({ redirectURL: originalUrl });

        if (existingUrl) {
            const shortenedUrl = `${req.protocol}://${req.get('host')}/${existingUrl.shortId}`;
            return res.render('index', { shortenedUrl, decode,hostname });
        }

        const shortUrlCode = shortid.generate();
        const newUrlData = {
            shortId: shortUrlCode,
            redirectURL: originalUrl,
        };

        if (decode) {
            newUrlData.email = decode.email;
        }

        await urlmodel.create(newUrlData);

        const shortenedUrl = `${req.get('host')}/g/${shortUrlCode}`;
        res.render('index', { shortenedUrl, decode,hostname });
        
    } catch (error) {
        console.error('Error creating shortened URL:', error);
        res.status(500).send('An error occurred while shortening the URL.');
    }
};
 

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

exports.contactpage=async (req,res)=>{
    console.log("load on contact page");
    let decode = null;
    console.log("error occour");
    
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
    console.log("load on usercontact");
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
    console.log("load on about");
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
    console.log("load on showhistory");
    

   let  decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);   
   let email = decode.email;
   let data = await urlmodel.find({email})
   res.json(data);
}



