let express = require('express');
let router = express.Router();
var qr = require('qr-image')

/* GET authenticate a user/redirect to steemconnect. */
router.get('/', (req, res, next) => {
    var qrPNG = qr.image(req.query.link, { type: 'png' });
    res.type('png');
    qrPNG.pipe(res);
});

module.exports = router;
