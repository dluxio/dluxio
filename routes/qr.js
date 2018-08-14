let express = require('express');
let steem = require('../modules/steemconnect')
let router = express.Router();

/* GET authenticate a user/redirect to steemconnect. */
router.get('/', (req, res, next) => {
    res.render('qr');
});

module.exports = router;
