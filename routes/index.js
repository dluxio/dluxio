let express = require('express');
let util = require('../modules/util');
let steem = require('../modules/steemconnect');
let router = express.Router();
let request = require('request');

/* GET home page. */
router.get('/', (req, res, next) =>  {
  if(req.session.steemconnect){
    res.redirect('/feed/new')
  } else {
    res.render('index', { title: 'dlux'});
  }
});

/* GET a users blog profile page. */
router.get('/@:username', (req, res, next) => {
      let username = req.params.username
      res.render('profile', {
        username: username,
      });
});

/* GET a users blog feed page. */
router.get('/@:username/feed', (req, res, next) => {
      let username = req.params.username
      res.render('feed', {
        feed: 'user-feed',
        username: username
      });
});

/* GET a users transfers profile page. */
router.get('/@:username/transfers', (req, res, next) => {
      let username = req.params.username
      res.render('transfers', {
        username: username,
        user: req.session.steemconnect ? req.session.steemconnect.name : ''
      });
});

/* GET a single post page page. */
router.get('/:category/@:username/:permlink', async (req, res, next) => {
      let category = req.params.category
      let username = req.params.username
      let permlink = req.params.permlink
      var dataString = '{"jsonrpc":"2.0", "method":"condenser_api.get_content", "params":["' + username + '", "' + permlink + '"], "id":1}';
      var options = {
      url: 'https://api.steemit.com',
      method: 'POST',
      body: dataString
      };
      let title = 'dlux VR'
      let description = 'Blockchain powered social VR'
      let image = 'https://ipfs.io/ipfs/QmQ84g5YwraX1cF87inZut2GaQiBAFaKEHsUaYT44oTs9h'
      let iAm = 'Guest'
      if(req.session.steemconnect){
        iAm = req.session.steemconnect.name
        res.render('single', {
          category: category,
          username: username,
          permlink: permlink,
          OGtitle: title,
          OGdescription: description,
          OGimage: image,
          iAm: iAm
        });
      } else {
        try {
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
          const robot = await request(options, function(err, res, body) {
            let json = JSON.parse(body);
            title = json.result.title
            description = json.result.body
            var metadata = json.result.json_metadata
            image = JSON.parse(metadata).image[0]
            render();
          });
        } catch (e) {
          console.log('API error, vanillia template served\n' + e)
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
      }
      });

router.get('/@:username/:permlink', (req, res, next) => {
      let username = req.params.username
      let permlink = req.params.permlink
      if(req.session.steemconnect){
        let iAm = req.session.steemconnect.name
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

module.exports = router;
