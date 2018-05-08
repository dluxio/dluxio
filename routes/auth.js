let express = require('express');
let steem = require('../modules/steemconnect')
let router = express.Router();

/* GET auth listing. */
router.get('/', (req, res, next) => {
    if (!req.query.access_token ) {
        let uri = steem.getLoginURL()
        res.redirect(uri)
    } else {
        steem.setAccessToken(req.query.access_token)
        steem.me((err, steemResponse) => {
          if (err) console.log(err)
          req.session.token = req.query.access_token
          req.session.steemconnect = steemResponse.account
          res.redirect('/dashboard')
        })
    }
})

router.get('/logout', (req, res) => {
   req.session.destroy()
   res.redirect("/")
})

module.exports = router
