// Support code for event handling in Google Web Designer
     // This script block is auto-generated. Please do not edit!
    gwd.actions.events.registerEventHandlers = function(event) {
      gwd.actions.events.addHandler('xr-taparea', 'action', gwd.xrTap, false);
      gwd.actions.events.addHandler('info-taparea', 'action', gwd.infoTap, false);
      gwd.actions.events.addHandler('menu-btn', 'action', gwd.toggleMenu, false);
      gwd.actions.events.addHandler('upvote-btn', 'action', gwd.upVote, false);
      gwd.actions.events.addHandler('resteem-taparea', 'action', gwd.resteem, false);
      gwd.actions.events.addHandler('mute-taparea', 'action', gwd.mute, false);
      gwd.actions.events.addHandler('pay-taparea', 'action', gwd.pay, false);
      gwd.actions.events.addHandler('delegate-taparea', 'action', gwd.delegateTap, false);
      gwd.actions.events.addHandler('follow-taparea', 'action', gwd.follow, false);
      gwd.actions.events.addHandler('shutter-taparea', 'action', gwd.shutterBtn, false);
      gwd.actions.events.addHandler('home-taparea', 'action', gwd.homeTap, false);
      gwd.actions.events.addHandler('sendsteem-taparea', 'action', gwd.sendSteemTap, false);
      gwd.actions.events.addHandler('about-taparea', 'action', gwd.aboutTap, false);
      gwd.actions.events.addHandler('logout-taparea', 'action', gwd.logoutTap, false);
      gwd.actions.events.addHandler('userprofile-taparea', 'action', gwd.userProfileTap, false);
      gwd.actions.events.addHandler('close-taparea', 'action', gwd.closeTap, false);
    };
    gwd.actions.events.deregisterEventHandlers = function(event) {
      gwd.actions.events.removeHandler('xr-taparea', 'action', gwd.xrTap, false);
      gwd.actions.events.removeHandler('info-taparea', 'action', gwd.infoTap, false);
      gwd.actions.events.removeHandler('menu-btn', 'action', gwd.toggleMenu, false);
      gwd.actions.events.removeHandler('upvote-btn', 'action', gwd.upVote, false);
      gwd.actions.events.removeHandler('resteem-taparea', 'action', gwd.resteem, false);
      gwd.actions.events.removeHandler('mute-taparea', 'action', gwd.mute, false);
      gwd.actions.events.removeHandler('pay-taparea', 'action', gwd.pay, false);
      gwd.actions.events.removeHandler('delegate-taparea', 'action', gwd.delegateTap, false);
      gwd.actions.events.removeHandler('follow-taparea', 'action', gwd.follow, false);
      gwd.actions.events.removeHandler('shutter-taparea', 'action', gwd.shutterBtn, false);
      gwd.actions.events.removeHandler('home-taparea', 'action', gwd.homeTap, false);
      gwd.actions.events.removeHandler('sendsteem-taparea', 'action', gwd.sendSteemTap, false);
      gwd.actions.events.removeHandler('about-taparea', 'action', gwd.aboutTap, false);
      gwd.actions.events.removeHandler('logout-taparea', 'action', gwd.logoutTap, false);
      gwd.actions.events.removeHandler('userprofile-taparea', 'action', gwd.userProfileTap, false);
      gwd.actions.events.removeHandler('close-taparea', 'action', gwd.closeTap, false);
    };
    document.addEventListener("DOMContentLoaded", gwd.actions.events.registerEventHandlers);
    document.addEventListener("unload", gwd.actions.events.deregisterEventHandlers);
