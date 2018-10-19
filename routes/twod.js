let express = require('express');
let util = require('../modules/util');
let router = express.Router();

/* GET a feed page. */
router.get('/@:username', (req, res, next) => {
      let username = req.params.username
      if (!req.user) {
        let iAm = 'Guest'
      } else {
        let iAm = req.user.username
      }
      res.render('profile2d', {
        user: iAm,
        username: username,
      });
});
router.get('/:feed/:tag?', (req, res, next) => {
  if (!req.user) {
    let iAm = 'Guest'
  } else {
    let iAm = req.user.username
  }
    let feed = req.params.feed
    let tag = req.params.tag
    res.render('feed2d', {
      user: iAm,
      feed: feed,
      tag: tag
    });
});
router.get('/@:username/feed', (req, res, next) => {
    if (!req.user) {
      let iAm = 'Guest'
    } else {
      let iAm = req.user.username
    }
    let username = req.params.username
    res.render('feed2d', {
      user: iAm,
      feed: 'user-feed',
      username: username
    });
});
router.get('/', (req, res, next) =>  {
  if (!req.user) {
    let iAm = 'Guest'
  } else {
    let iAm = req.user.username
  }
  res.render('feed2d', {
    user: iAm,
    feed: 'feed',
    tag: 'dlux'
  });
});

module.exports = router;
