import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import aframe from 'aframe';
import sc2 from 'sc2-sdk';
import steem from 'steemjs-lib';
import { FlowRouter } from 'meteor/flowRouter';
import SteemData from 'SteemData';

import './main.html';
import './brain/dlux.js';
import './lib/routes.js';

var aframeGui = require('aframe-gui');



/*
  steem.broadcast.vote("wif", "userId",
    "post", "postlink", 10000, function(err, result) {
    console.log(err, result);
}); */
  /* activePostClass(post) {
    const active = ActiveRoute.name('post')
      && FlowRouter.getParam('_postid') === post._id;
    return active && 'active';
  },
  activeListClass(user) {
    const active = ActiveRoute.name('user')
      && FlowRouter.getParam('_userid') === user._userid;
    return active && 'active';
  },
  activeClass(home) {
    const active = ActiveRoute.name('home');
    return active && 'active';
  } */


Template.dlux.helpers({

});

Template.dlux.events({

   });

Template.loginSC.helpers({

});

Template.loginSC.events({

});

Template.postLoader.helpers({
 /*  postID(){
    let postId = Flowrouter.getParam('_postid');
    return Meteor.users.findOne(postId);
  } */
});

Template.postLoader.events({

});

Template.userLoader.helpers({
/*  user(){
    let userId = Flowrouter.getParam('_userid');
    return Meteor.users.findOne(userId);
  } */
});

Template.userLoader.events({

});
