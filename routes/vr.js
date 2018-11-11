let express = require('express');
let util = require('../modules/util');
let router = express.Router();


router.get('/', (req, res, next) =>  {
  res.render('vr')
});

module.exports = router;
