let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let expressSanitized = require('express-sanitize-escape');

let index = require('./routes/index');
let user = require('./routes/user');
let auth = require('./routes/auth');
let feed = require('./routes/feed');
let post = require('./routes/post');

let config = require('./config')

let app = express();

app.use(session({
    secret: config.session.secret,
    saveUninitialized: true,
    resave: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitized.middleware());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/dashboard', user);
app.use('/auth', auth);
app.use('/logout', auth);
app.use('/feed', feed);
app.use('/post', post);
app.use('/post/create-post', post);
app.use('/post/dluxpost', post);
app.use('/post/create-dluxpost', post);
app.use('/360v', post);



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
