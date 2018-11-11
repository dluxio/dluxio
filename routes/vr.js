let express = require('express');
let util = require('../modules/util');
let router = express.Router();


router.get('/', (req, res, next) =>  {
  if(req.user){ var user = req.user.username} else {var user = 'Guest'}
      res.render('vr', {
        user: user,
      });
});

module.exports = router;
