let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>  {
  if(req.session.steemconnect){
    res.redirect('/dashboard')
  } else {
    res.render('index', { title: 'Decentralized Limitless User eXperiences' });
  }
});

router.get('/@:username?', (req, res, next) => {
      let username = req.params.username
      console.log(username)
      res.render('profile', {
        name: username
      });
});

router.get('/:category/@:username/:permlink', (req, res, next) => {
      let category = req.params.category
      let username = req.params.username
      let permlink = req.params.permlink
      if (category == "dluxVR") { //to render our VR scene
        res.render('dlux', {
          category: category,
          username: username,
          permlink: permlink
        });
      } else {
      res.render('single', {
        category: category,
        username: username,
        permlink: permlink
      });
    }
});

module.exports = router;
