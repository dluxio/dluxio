FlowRouter.route('/@:_userid', {
  name: 'user',
  action() {
    BlazeLayout.render('App_body', {main: 'userLoader'});
  }
});

FlowRouter.route('/:_postid', {
  name: 'post',
  action() {
    BlazeLayout.render('App_body', {main: 'postLoader'});
  }
});
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('App_body', {main: 'dlux'});
  }
});
FlowRouter.route('/login', { //Takes you to a standard website with keyboard access so you can login to steemconnect.
  name: 'login',
  action() {
    BlazeLayout.render('App_body', {main: 'loginSC'});
  }
});
