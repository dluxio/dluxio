let express = require('express');
let util = require('../modules/util');
//let steem = require('../modules/steemconnect');
var passport = require('passport');
let router = express.Router();


/* GET a create ar post page. */
router.get('/', (req, res, next) => {
  if (req){
    res.render('arpost', {
      user: req.user.username
    });
  }
  else {
    res.render('/', {
    });
  }
});

module.exports = router;
