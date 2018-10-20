let express = require('express');
let util = require('../modules/util');
let steem = require('../modules/steemconnect');
let passport = require('passport');
let router = express.Router();
var steemR = require('steem');


/* GET a create post page. */
router.get('/', util.isAuthenticated, (req, res, next) => {
    res.render('post', {
      user: req.user.username
    });
});


function getSteemContent(username, permlink) {
  return new Promise((resolve, reject) => {
steemR.api.getContent(username, permlink, function(err, result) {
  if (err) {resolve({err: 'Log in as author?'});}
  var title = result.title
  var description = result.body
  var image
  var vrHash = 0
  var arHash = 0
  //var hash360 = JSON.parse(result.json_metadata).Hash360
  try {
  if (JSON.parse(result.json_metadata).image[0]) {
    image = JSON.parse(result.json_metadata).image[0]
    if (image.charAt(0) == 'Q'){
    image = 'https://ipfs.io/ipfs/' + image;}
  }
  } catch (e) {image = 'https://ipfs.io/ipfs/QmQ84g5YwraX1cF87inZut2GaQiBAFaKEHsUaYT44oTs9h' }
  try {
  if (JSON.parse(result.json_metadata).vrHash) {
    vrHash = JSON.parse(result.json_metadata).vrHash
    resolve({title: title, description: description, image: image, vrHash: vrHash});
  }
} catch (e) {console.log('error in Retrival')}
  try {
  if (JSON.parse(result.json_metadata).arHash) {
    vrHash = JSON.parse(result.json_metadata).arHash
    resolve({title: title, description: description, image: image, arHash: vrHash})
  }
} catch (e) {}
  resolve({title: title, description: description, image: image});
});
});
}

//blockchain editor
router.get('/edit/@:username/:permlink', util.isAuthenticated, (req, res, next) => {
  getSteemContent(req.user.username, req.params.permlink).then(data => {
    if (data.err){
      res.render('post', {
        user: data.err,
      });
    } else {
    if (data.vrHash){
    res.render('post', {
      permlink: req.params.permlink,
      user: req.user.username,
      title: data.title,
      description: data.description,
      image: data.image,
      vrHash: data.vrHash,
      hash360: data.hash360
    });
  } else {
    res.render('arpost', {
      permlink: req.params.permlink,
      user: req.user.username,
      title: data.title,
      description: data.description,
      image: data.image,
      arHash: data.arHash,
      hash360: data.hash360
    });
  }
}
});
});

/* POST a create post broadcast to STEEM network. */

router.post('/create-post', util.isAuthenticated, (req, res) => {
  steem.setAccessToken(req.user.steem)
  let author = req.user.username
  let topbody = req.body.post
  let permlink = req.body.permlink
  if (!permlink) {permlink = util.urlString()}
  var tags = req.body.tags.split(',').map(item => item.trim())
  let primaryTag = 'dlux'
  let otherTags = tags.slice(0, 4)
  let title = req.body.title
  let hashy = req.body.vrHash
  if (hashy.split('/')[3] == 'ipfs') {
  hashy = hashy.split('/')[4];
  }
  let image = req.body.image
  if (image.split('/')[3] != 'ipfs') {
  image = 'https://ipfs.io/ipfs/' + image;
  }
  let Hash360 = req.body.Hash360
  if (Hash360.split('/')[3] == 'ipfs') {
  Hash360 = Hash360.split('/')[4];
  }
  let customData = JSON.stringify({
    'tags': otherTags,
    'app': 'dlux/0.1',
    'vrHash': hashy,
    'image': 'https://ipfs.io/ipfs/' + image,
    'Hash360': Hash360,
    'headerLength': topbody.length
  })
  var linker = `***
  #### [View in VR @dlux-io](https://dlux.io/dlux/@` + author + `/` + permlink + `)`
  var body
  var p = topbody.search(permlink)
  if (p) {
    body = topbody
    steem.broadcast([['comment',{'parent_author': '','parent_permlink': 'dlux','author': author,'permlink': permlink,'title': title,'body': body,'json_metadata': customData}]], function (err, response) {
    if (err) {
      res.json({msg: err})
    } else {
      res.redirect(`/@${author}`)
    }
  })
  } else {
  var body = topbody + linker
  steem.broadcast([['comment',{'parent_author': '','parent_permlink': 'dlux','author': author,'permlink': permlink,'title': title,'body': body,'json_metadata': customData}],['comment_options',{'author': author,'permlink': permlink,'max_accepted_payout': '1000000.000 SBD','percent_steem_dollars': 10000,'allow_votes': true,'allow_curation_rewards': true,'extensions': [[0,{'beneficiaries': [{'account': 'dlux-io','weight': 1000}]}]]}]], function (err, response) {
  if (err) {
    res.json({msg: err})
  } else {
    res.redirect(`/@${author}`)
  }
})
}
});

/* POST a create customJson broadcast to STEEM network. */

router.post('/custom', util.isAuthenticated, (req, res) => {
  steem.setAccessToken(req.user.steem)
  var params = {
    required_auths: req.body.requiredAuths,
    required_posting_auths: req.body.requiredPostingAuths,
    id: req.body.id,
    json: req.body.json
};
  steem.broadcast([['custom_json', params]], function(err, result) {
    if (err) {
      res.json({ err: err })
    } else {
      res.json({ msg: result })
    }
});
});

router.post('/follow', util.isAuthenticated, (req, res) => {
  steem.setAccessToken(req.user.steem)
  steem.follow(req.user.username, req.body.following, function (err, res) {
    if (err) {
      res.json({ err: err })
    } else {
      res.json({ msg: result })
    }
});
});

/* POST a vote broadcast to STEEM network. */

router.post('/vote', util.isAuthenticatedJSON, (req, res) => {
    steem.setAccessToken(req.user.steem)
    let postId = req.body.postId
    let voter = req.user.username
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
router.post('/comment', util.isAuthenticatedJSON, (req, res) => {
    steem.setAccessToken(req.user.steem)
    let author = req.user.username
    let permlink = req.body.parentPermlink + '-' + util.urlString()
    let title = 'RE: ' + req.body.parentTitle
    let body = req.body.message
    let parentAuthor = req.body.parentAuthor
    let parentPermlink = req.body.parentPermlink
    let customJSON = req.body.customJSON

    steem.comment(parentAuthor, parentPermlink, author, permlink, title, body, customJSON, (err, steemResponse) => {
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

router.post('/create-arpost', util.isAuthenticatedJSON, (req, res) => {
  steem.setAccessToken(req.user.steem)
  let author = req.user.username
  let topbody = req.body.post
  let permlink = req.body.permlink
  let xr = req.body.xr
  var tags = req.body.tags.split(',').map(item => item.trim())
  let primaryTag = 'dluxar'
  let otherTags = tags.slice(0, 4)
  let title = req.body.title
  if (!permlink) {permlink = util.urlString()}
  let hashy = req.body.vrHash
  let header = topbody.length
  if (hashy.split('/')[3] == 'ipfs') {
  hashy = hashy.split('/')[4];
  }
  let image = req.body.image
  if (image.split('/')[3] != 'ipfs') {
  image = 'https://ipfs.io/ipfs/' + image;
  }
  let customData = JSON.stringify({
    'tags': otherTags,
    'app': 'dlux/0.1',
    'arHash': hashy,
    'image': 'https://ipfs.io/ipfs/' + image,
    'headerLength': header,
    'xr': xr
  })
  var resource = 'https://dlux.io/dluxar/@' + author + '/' + permlink
  var qrCodeURL = 'https://dlux.io/qr?link=' + resource
  var linker = `
  ![scan with smart phone](` + qrCodeURL + `)
  QR Code contains [link](` + resource + `) to AR dApp
  ![point phone here](https://ipfs.io/ipfs/QmXursyDdgcXHuVPSNtTN8G95SPDJGfUhyZVE97kngBWnN)
  This is an AR Marker
  Posted on [dlux](https://dlux.io)`

  var body
  var p = topbody.search(permlink)
  if (p) {
    body = topbody
    steem.broadcast([['comment',{'parent_author': '','parent_permlink': 'dlux','author': author,'permlink': permlink,'title': title,'body': body,'json_metadata': customData}]], function (err, response) {
    if (err) {
      res.json({msg: err})
      //res.redirect(`/@${parentAuthor}/${parentPermlink}`)
    } else {
      res.redirect('https://dlux.io/@' + author)
    }
  })
  } else {
  var body = topbody + linker
  steem.broadcast([['comment',{'parent_author': '','parent_permlink': 'dlux','author': author,'permlink': permlink,'title': title,'body': body,'json_metadata': customData}],['comment_options',{'author': author,'permlink': permlink,'max_accepted_payout': '1000000.000 SBD','percent_steem_dollars': 10000,'allow_votes': true,'allow_curation_rewards': true,'extensions': [[0,{'beneficiaries': [{'account': 'dlux-io','weight': 1000}]}]]}]], function (err, response) {
  if (err) {
    res.json({msg: err})
    //res.redirect(`/@${parentAuthor}/${parentPermlink}`)
  } else {
    res.redirect('https://dlux.io/@' + author)
  }
})
}
});
module.exports = router;
