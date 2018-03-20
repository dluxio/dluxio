import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import aframe from 'aframe';
import sc2 from 'sc2-sdk';
import { FlowRouter } from 'meteor/flowRouter';

import './main.html';
import './brain/dlux.js';
import './lib/routes.js';

var aframeGui = require('aframe-gui');

Template.dlux.onCreated(function dluxOnCreated() {
  sc2.init({
  app: 'dlux',
  callbackURL: 'localhost:3000',
  scope: ['vote', 'comment']
});
});

Template.dlux.helpers({
});

Template.dlux.events({
});s
