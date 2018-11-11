let express = require('express');
let util = require('../modules/util');
let router = express.Router();


router.get('/', (req, res, next) =>  {
  if(req.user){
      res.render('vr', {
        user: req.user.username,
      });
    } else {
      res.render('vr');
    }
});

module.exports = router;
