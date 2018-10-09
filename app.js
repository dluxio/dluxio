let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cookieSession = require('cookie-session');
let expressSanitized = require('express-sanitize-escape');
let cors = require('cors');
let socketIo = require("socket.io");        // web socket external module
let easyrtc = require("easyrtc");               // EasyRTC external module
let request = require('request');
let index = require('./routes/index');
let auth = require('./routes/auth');
let feed = require('./routes/feed');
let post = require('./routes/post');
let twod = require('./routes/twod')
let qr = require('./routes/qr');
let arpost = require('./routes/arpost');
let config = require('./config');
let util = require('./modules/util');
let steemconnect2 = require('sc2-sdk');
let app = express();
var passport = require('passport');
var SteemConnectStrategy = require('passport-steemconnect').Strategy;
app.set('trust proxy');
app.use(cors({
  methods: 'GET',
  optionsSuccessStatus: 200,
  origin: '*, *'
}));
app.options(cors());
app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
  maxAge: 6 * 24 * 60 * 60 * 1000   //6 days
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitized.middleware());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// custom middleware
app.use(util.setUser);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


passport.use(new SteemConnectStrategy({
  authorizationURL: `https://steemconnect.com/oauth2/authorize`,
  tokenURL: `https://steemconnect.com/api/oauth2/token`,
  clientID: config.auth.client_id,
  clientSecret: config.session.secret,
  callbackURL: config.auth.redirect_uri,
  scope: ['login','vote','comment','comment_options','custom_json'],
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.steem = accessToken
    return cb(null, profile);
   }   ));
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/logout', function (req, res){
          req.logOut();
          res.redirect('/');
});
app.get('/auth',
    passport.authenticate('steemconnect'));
app.get('/auth/oauth/oauth2/callback',
    passport.authenticate('steemconnect', { failureRedirect: '/arpost' }),
    function(req, res) {
          res.redirect('/');
          delete req.session.returnTo;
        });


app.use('/', index);
//app.use('/auth', auth);
//app.use('/logout', auth);
app.use('/feed', feed);
app.use('/2d', twod);
app.use('/arpost', arpost);
app.use('/keycam', index);
app.use('/qr', qr);
app.use('/post', post);
app.use('/post/create-post', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
