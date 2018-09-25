let express = require('express');
let router = express.Router();
let request = require('request');
var steem = require('steem');
/* GET home page. */
function removeMD(md, options) {
options = options || {};
options.listUnicodeChar = options.hasOwnProperty('listUnicodeChar') ? options.listUnicodeChar : false;
options.stripListLeaders = options.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true;
options.gfm = options.hasOwnProperty('gfm') ? options.gfm : true;
options.useImgAltText = options.hasOwnProperty('useImgAltText') ? options.useImgAltText : false;

var output = md || '';

// Remove horizontal rules (stripListHeaders conflict with this rule, which is why it has been moved to the top)
output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, '');

try {
if (options.stripListLeaders) {
if (options.listUnicodeChar)
output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + ' $1');
else
output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, '$1');
}
if (options.gfm) {
output = output
// Header
.replace(/\n={2,}/g, '\n')
// Fenced codeblocks
.replace(/~{3}.*\n/g, '')
// Strikethrough
.replace(/~~/g, '')
// Fenced codeblocks
.replace(/`{3}.*\n/g, '');
}
output = output
// Remove HTML tags
.replace(/<[^>]*>/g, '')
// Remove setext-style headers
.replace(/^[=\-]{2,}\s*$/g, '')
// Remove footnotes?
.replace(/\[\^.+?\](\: .*?$)?/g, '')
.replace(/\s{0,2}\[.*?\]: .*?$/g, '')
// Remove images
.replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? '$1' : '')
// Remove inline links
.replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
// Remove blockquotes
.replace(/^\s{0,3}>\s?/g, '')
// Remove reference-style links?
.replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
// Remove atx-style headers
.replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm, '$1$2$3')
// Remove emphasis (repeat the line to remove double emphasis)
.replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
.replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
// Remove code blocks
.replace(/(`{3,})(.*?)\1/gm, '$2')
// Remove inline code
.replace(/`(.+?)`/g, '$1')
// Replace two or more newlines with exactly two? Not entirely sure this belongs here...
.replace(/\n{2,}/g, '\n\n');
} catch(e) {
console.error(e);
return md;
}
return output;
};

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


/* OG:data call for .head requests*/
      function getSteemContent(username, permlink) {
        return new Promise((resolve, reject) => {
      steem.api.getContent(username, permlink, function(err, result) {
        if (err) {resolve({title: 'dlux VR', description: 'Blockchain powered social VR', image: 'https://ipfs.io/ipfs/QmQ84g5YwraX1cF87inZut2GaQiBAFaKEHsUaYT44oTs9h'});}
        var title = result.title
        var description = removeMD(result.body).trim().substr(0, 220) + '... by @' + result.author
        var image
        try {
        if (JSON.parse(result.json_metadata).image[0]) {
          image = JSON.parse(result.json_metadata).image[0]
          if (image.charAt(0) == 'Q'){
          image = 'https://ipfs.io/ipfs/' + image;}
        }
        } catch (e) {image = 'https://ipfs.io/ipfs/QmQ84g5YwraX1cF87inZut2GaQiBAFaKEHsUaYT44oTs9h' }
        resolve({title: title, description: description, image: image});
      });
      });
    }
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
        render()
      } else if(req.route.stack[0].method == 'get'){ //something that would only get sent when requestiong from off platform for OG:data? hmm
        getSteemContent(username, permlink).then(data => {
          title = data.title;
          description = data.description;
          image = data.image;
          render();
        });
      } else {render()}
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
      });

router.get('/@:username/:permlink', (req, res, next) => {
  let username = req.params.username
  let permlink = req.params.permlink
  let title = 'dlux VR'
  let description = 'Blockchain powered social VR'
  let image = 'https://ipfs.io/ipfs/QmQ84g5YwraX1cF87inZut2GaQiBAFaKEHsUaYT44oTs9h'
  let iAm = 'Guest'
  if (req.user){
    iAm = req.user.username
    render()
  } else if(req.route.stack[0].method == 'get'){ //something that would only get sent when requestiong from off platform for OG:data? hmm
    getSteemContent(username, permlink).then(data => {
      title = data.title;
      description = data.description;
      image = data.image;
      render();
    });
  } else {render()}
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
