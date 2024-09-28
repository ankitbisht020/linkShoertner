const express =require('express');
const router = express.Router();
const url = require('../controllers/url')

router.get('/',url.homepage);
router.post('/shorten', url.shorten);
router.get('/:code', url.redirectolink);

module.exports = router;