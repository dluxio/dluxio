let express = require('express');
let util = require('../modules/util');
let router = express.Router();

/* GET a feed page. */
router.get('/@:username', (req, res, next) => {
      let username = req.params.username || 'Guest'
      let iAm = req.user.username
      res.render('profile2d', {
        user: iAm,
        username: username,
      });
});
router.get('/:feed/:tag?', (req, res, next) => {
    let iAm = req.user.username || 'Guest'
    let feed = req.params.feed
    let tag = req.params.tag
    res.render('feed2d', {
      feed: feed,
      tag: tag
    });
});
router.get('/@:username/feed', (req, res, next) => {
      let iAm = req.user.username || 'Guest'
      let username = req.params.username
      res.render('feed2d', {
        feed: 'user-feed',
        username: username
      });
});
router.get('/', (req, res, next) =>  {
  let iAm = req.user.username || 'Guest'
  res.render('feed2d', {
    feed: 'feed',
    tag: 'dlux'
  });
});

module.exports = router;
