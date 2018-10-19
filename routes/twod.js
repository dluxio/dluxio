let express = require('express');
let util = require('../modules/util');
let router = express.Router();

/* GET a feed page. */
router.get('/@:username', (req, res, next) => {
      let username = req.params.username
      if (req.user) {
        let iAm = req.user.username
        renderU();
      } else {
        renderG();
      }
      function renderG() {
      res.render('profile2d', {
        username: username,
      });
    }
    function renderU() {
    res.render('profile2d', {
      user: iAm,
      username: username,
    });
  }
});
router.get('/:feed/:tag?', (req, res, next) => {
    let feed = req.params.feed
    let tag = req.params.tag
    if (req.user) {
      let iAm = req.user.username
      renderU();
    } else {
      renderG();
    }
    function renderG() {
    res.render('feed2d', {
      feed: feed,
      tag: tag
    });
  }
  function renderU() {
  res.render('feed2d', {
    user: iAm,
    feed: feed,
    tag: tag
  });
}
});
router.get('/@:username/feed', (req, res, next) => {
    let username = req.params.username
    if (req.user) {
      let iAm = req.user.username
      renderU();
    } else {
      renderG();
    }
    function renderG() {
    res.render('feed2d', {
      feed: 'user-feed',
      username: username
    });
  }
    function renderU() {
    res.render('feed2d', {
      user: iAm,
      feed: 'user-feed',
      username: username
    });
  }
});
router.get('/', (req, res, next) =>  {
  if (req.user) {
    let iAm = req.user.username
    renderU();
  } else {
    renderG();
  }
  function renderG() {
  res.render('feed2d', {
    feed: 'feed',
    tag: 'dlux'
  });
}
  function renderU() {
  res.render('feed2d', {
    user: iAm,
    feed: 'feed',
    tag: 'dlux'
  });
}
});

module.exports = router;
