let express = require('express');
let util = require('../modules/util');
let steem = require('../modules/steemconnect')
let router = express.Router();


/* GET a create post page. */
router.get('/', util.isAuthenticated, (req, res, next) => {
    res.render('post', {
      name: req.session.steemconnect.name
    });
});

/* POST a create post broadcast to STEEM network. */

router.post('/create-post', util.isAuthenticated, (req, res) => {
  let author = req.session.steemconnect.name
  let body = req.body.post
  let permlink = util.urlString()
  var tags = req.body.tags.split(',').map(item => item.trim())
  let primaryTag = 'dlux'
  let otherTags = tags.slice(0, 4)
  let title = req.body.title
  let hashy = req.body.vrHash
  let image = req.body.image
  let Hash360 = req.body.Hash360
  let customData = JSON.stringify({
    'app': 'dlux/v0.0.1',
    'vrHash': hashy,
    'image': 'https://ipfs.io/ipfs/' + image,
    'Hash360': Hash360
  })
  steem.broadcast([['comment',{'parent_author': '','parent_permlink': 'dlux','author': author,'permlink': permlink,'title': title,'body': body,'json_metadata': customData}],['comment_options',{'author': author,'permlink': permlink,'max_accepted_payout': '1000000.000 SBD','percent_steem_dollars': 10000,'allow_votes': true,'allow_curation_rewards': true,'extensions': [[0,{'beneficiaries': [{'account': 'dlux-io','weight': 1000}]}]]}]], function (err, response) {
  if (err) {
    console.log(err)
    //res.redirect(`/@${parentAuthor}/${parentPermlink}`)
  } else {
    res.redirect(`/@${author}`)
  }
})
});

/* POST a vote broadcast to STEEM network. */
router.post('/vote', util.isAuthenticatedJSON, (req, res) => {
    let postId = req.body.postId
    let voter = req.session.steemconnect.name
    let author = req.body.author
    let permlink = req.body.permlink
    let weight = parseInt(req.body.weight, 10)

    steem.vote(voter, author, permlink, weight, function (err, steemResponse) {
      if (err) {
          res.json({ id: err.error_description })
      } else {
          res.json({ id: postId })
      }
    });
})

/* POST a comment broadcast to STEEM network. */
router.post('/comment',  util.isAuthenticatedJSON, (req, res) => {
    let author = req.session.steemconnect.name
    let permlink = req.body.parentPermlink + '-' + util.urlString()
    let title = 'RE: ' + req.body.parentTitle
    let body = req.body.message
    let parentAuthor = req.body.parentAuthor
    let parentPermlink = req.body.parentPermlink

    steem.comment(parentAuthor, parentPermlink, author, permlink, title, body, '', (err, steemResponse) => {
      if (err) {
        res.json({ error: err.error_description })
      } else {
        res.json({
          msg: 'Posted To Steem Network',
          res: steemResponse
        })
      }
    });
});

module.exports = router;
