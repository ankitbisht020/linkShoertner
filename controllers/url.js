const shortid = require('shortid'); // For generating short URL codes
const urlmodel = require('../models/urlmodel');
const contact = require('../models/usercontact');
const { default: mongoose } = require('mongoose');
exports.homepage=(req,res)=>{
    res.render('index',{shortenedUrl:null});
}
exports.shorten= async (req, res) => {

    let originalurl= req.body.url;
    console.log("Original url:",originalurl);

    const shortUrlCode = shortid.generate();
    const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;
    console.log("ShortId:",shortUrlCode);
    try{
        let Url =await urlmodel.findOne({originalurl});
        if(Url){
            const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;
            res.render('index', {shortenedUrl,shortUrlCode});
            
        }else{
            const urlcreate=await urlmodel.create({
                shortId:shortUrlCode,
                redirectURL:originalurl
                
            });
        }
        
        res.render('index', {shortenedUrl,shortUrlCode});
    }catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }

}
   

exports.redirectolink =async (req, res) => {
    
    const shortUrlCode = req.params.code;
    console.log(shortUrlCode);
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
    res.render('contact',{alertMessage:null})
}

exports.usercontact= async(req,res)=>{
    const { name, email, phone, message } = req.body;
   

    let usercontacts=await contact.findOne( {
        $or: [
        { phone },
        { email }
    ]});
    if(usercontacts){
        return res.render('contact', { alertMessage: 'You already submitted a request. We will contact you soon.', redirectURL: '/contact' });
       

    }else{
    try{
      await contact.create(
        {       
            name:name,
            phone:phone,
            email:email,
            message:message
        });
        
        return res.render('contact', { alertMessage: 'Thank you for contacting us! Redirecting you...', redirectURL: '/' });
        console.log("user created");
    }catch(error){
        res.send("some error occur at our side.");
    }
}
      
}

