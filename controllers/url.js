const shortid = require('shortid'); // For generating short URL codes
var urldatabse={originalurl:""};

exports.homepage=(req,res)=>{
    res.render('index',{shortenedUrl:null});
}

exports.shorten= (req, res) => {

    let originalurl= req.body.url;
    const shortUrlCode = shortid.generate();
    urldatabse.originalurl=originalurl;
    console.log(originalurl);
   
    const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrlCode}`;
    res.render('index', { shortenedUrl});
}

exports.redirectolink = (req, res) => {
    
    const shortUrlCode = req.params.code;
    const originalurl=urldatabse.originalurl;
    console.log(originalurl);
        
    if (originalurl) {
        res.redirect(originalurl);
    } else {
        res.status(404).send('URL not found');
    }
}