FlowRouter.route('/user/', {
  name: 'user',
  action() {
    BlazeLayout.render('App_body', {main: 'userLoader'});
  }
});

FlowRouter.route('/user/:_id', {
  name: 'user.id',
  action() {
    BlazeLayout.render('App_body', {main: 'userLoader'});

  }
});

FlowRouter.route('/post/', {
  name: 'post',
  action() {
    BlazeLayout.render('App_body', {main: 'postLoader'});
  }
});

FlowRouter.route('/post/:_id', {
  name: 'post.id',
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

FlowRouter.route('/login/', { //Takes you to a standard website with keyboard access so you can login to steemconnect.
  name: 'login',
  action() {
    BlazeLayout.render('App_body', {main: 'loginSC'});
  }
});
