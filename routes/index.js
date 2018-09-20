let express = require('express');
let router = express.Router();
let request = require('request');
/* GET home page. */
router.get('/', (req, res, next) =>  {
  if(req.user){
    res.render('index', {
      user: req.user.username,
    });
  } else {
    res.render('index', { title: 'dlux'});
  }
});

/* GET a users blog profile page. */
router.get('/@:username', (req, res, next) => {
  if(req.user){ var user = req.user.username} else {var user = 'Guest'}
      let username = req.params.username
      res.render('profile', {
        user: user,
        userfeed: username,
      });
});

/* GET a users blog feed page. */
router.get('/@:username/feed', (req, res, next) => {
  if(req.user){ var user = req.user.username} else {var user = 'Guest'}
      let username = req.params.username
      res.render('profile', {
        user: user,
        feed: 'user-feed',
        userfeed: username,
      });
});


/* GET a single post page page. */
router.get('/:category/@:username/:permlink', (req, res, next) => {
      let category = req.params.category
      let username = req.params.username
      let permlink = req.params.permlink
      let title = 'dlux VR'
      let description = 'Blockchain powered social VR'
      let image = 'https://ipfs.io/ipfs/QmQ84g5YwraX1cF87inZut2GaQiBAFaKEHsUaYT44oTs9h'
      let iAm = 'Guest'
      if (req.user){
        iAm = req.user.username
      }
      function render() {
        res.render('single', {
          category: category,
          username: username,
          permlink: permlink,
          OGtitle: title,
          OGdescription: description,
          OGimage: image,
          iAm: iAm
        });
      }
      render();
      });

router.get('/@:username/:permlink', (req, res, next) => {
      let username = req.params.username
      let permlink = req.params.permlink
      if(req.user){
        let iAm = req.user.username
        res.render('single', {
          category: 'dlux',
          username: username,
          permlink: permlink,
          iAm: iAm
        });
      } else {
      res.render('single', {
        category: 'dlux',
        username: username,
        permlink: permlink,
        iAm: "Guest"
      });
    }
});
router.get('/keycam', (req, res, next) => {
      if(req.user){
        let iAm = req.user.username
        res.render('qrscan', {
          iAm: iAm
        });
      } else {
      res.render('index', { title: 'dlux'});
    }
});

module.exports = router;
