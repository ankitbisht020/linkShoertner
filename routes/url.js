const express =require('express');
const router = express.Router();
const url = require('../controllers/url')
const create = require('../controllers/loginregister/loginregister')

router.get('/',url.homepage);
router.post('/shorten', url.shorten);
router.get('/goto/:code', url.redirectolink);
router.get('/contact', url.contactpage);
router.post('/usercontact', url.usercontact);
router.get('/about',url.about);
router.post('/createuser',create.createuser);
router.get('/logout',create.logout)
router.post('/login',create.login);
router.get('/showhistory', url.showhistory)
router.get('/delete/:id', create.delete)
module.exports = router;
