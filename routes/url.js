const express =require('express');
const router = express.Router();
const url = require('../controllers/url')

router.get('/',url.homepage);
router.post('/shorten', url.shorten);
router.get('/goto/:code', url.redirectolink);
router.get('/contact', url.contactpage);
router.post('/usercontact', url.usercontact);
module.exports = router;