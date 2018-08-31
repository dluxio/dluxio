let express = require('express');
let util = require('../modules/util');
let steem = require('../modules/steemconnect')
let router = express.Router();


/* GET a create ar post page. */
router.get('/', util.isAuthenticated, (req, res, next) => {
    res.render('arpost', {
      name: req.session.steemconnect.name
    });
});

module.exports = router;
