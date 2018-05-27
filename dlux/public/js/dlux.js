// Target URL
AFRAME.registerComponent('url', {
  schema: {default: ''},

  init: function () {

    var url = this.data;

    this.el.addEventListener('click', function () {
    window.location.href = url;
    });

}
});
// Toggle Author
AFRAME.registerComponent('toggle-info', {
  schema: {default: ''},

  init: function() {
    var el = document.querySelector('#author-info');
    this.el.addEventListener('mouseenter', function() {

    if (el.getAttribute('visible', true) ) {
        el.setAttribute('visible', false);
    } else {
        el.setAttribute('visible', true);
        }
    });
  }
});
// Desktop fps control


AFRAME.registerComponent('set-camera', {
	init: function () {
		const isDesktop = !AFRAME.utils.device.checkHeadsetConnected();
    const isMobile = AFRAME.utils.device.isMobile();
    const isHMD = !AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected();
    const isGearVR = AFRAME.utils.device.isGearVR();
    let entity = this.el;

    if (isDesktop === true) {
      entity.removeAttribute('look-controls');
      entity.setAttribute('position', '0 0 0');
      entity.setAttribute('fps-look-controls', 'enabled', true);
		}
    if (isMobile === true) {
      entity.removeAttribute('look-controls');
      entity.setAttribute('position', '0 0 0');
      entity.setAttribute('twoway-motion', 'speed:35');
    }
    if (isHMD === true) {

    }
    if (isGearVR === true) {
      //var leftEl = document.createElement('a-entity','gearvr-controls','hand:left');
      //var rightEl = document.createElement('a-entity','gearvr-controls', 'hand:right');

    }
	}
});
var postKey; //this page will be posted in IPFS and will need a way to display current state about itself. This key will be passed to declare its current state on Steem.
if (window.addEventListener) {
window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
window.attachEvent("onmessage", onMessage, false);
}
function onMessage(event) {
//if (event.origin !== "https://dlux.io" || "localhost:3000") return;
var data = event.data;
if (typeof(window[data.func]) == "function") {
window[data.func].call(null, data.message);
}
}
function voteMsg(message) {
  AFRAME.scenes[0].emit('setVoteVal', {val: message});
}
function voteButton() {
  voteAmt = parseInt(10000);
window.parent.postMessage({
    'func': 'vote',
    'message': voteAmt
}, "*");
}
function flagButton() {
var voteAmt = -1;
window.parent.postMessage({
  'func': 'vote',
  'message': voteAmt
}, "*");
}
function sendLink() {
//  var link = document.querySelector('link').value
window.parent.postMessage({
'func': 'sendLink',
'message': '/@disregardfiat'
}, "*");
}
function aVote() {
window.parent.postMessage({
'func': 'aVote',
'message': {
  'permlink': '',
  'author': '',
  'weight': parseInt(10000),
}
}, "*");
}
function key (message) {
  postKey = message;
}
function steemState(message) {
  AFRAME.scenes[0].emit('setID', {val: message.content[postKey].id});
  AFRAME.scenes[0].emit('setTitle', {val: message.content[postKey].root_title});
  AFRAME.scenes[0].emit('setAuthor', {val: message.content[postKey].author});
  AFRAME.scenes[0].emit('setVotesNum', {val: message.content[postKey].net_votes});
  AFRAME.scenes[0].emit('setVotesVal', {val: Math.round( parseFloat(message.content[postKey].pending_payout_value.substring(0,5)) * 100) / 100});
  console.log(message)
}
function iAm(message) {
  AFRAME.scenes[0].emit('setiAm', {val: message});
}
function onpageloaded() {
  window.parent.postMessage({
  'func': 'iloaded',
  'message': ''
}, "*");
}
  AFRAME.registerState({
    initialState: {
      post: "",
      username: "@",
      id: "",
      title: "No sync ...",
      author: "",
      rep: "UND",
      profileimage: "",
      votesNum: "UNK",
      votesVal: "$0",
      menuVis: false,
      voteMsg: "Vote!"
    },

    handlers: {
      setiAm: function (state, action) {
        state.username = "@" + action.val;
      },
      setVoteMsg: function (state, action) {
        state.voteMsg = action.val;
      },
      setID: function (state, action) {
        state.id = action.val;
      },
      setAuthor: function (state, action) {
        state.author = "@" + action.val;
      },
      setTitle: function (state, action) {
        state.title = action.val;
      },
      setVotesNum: function (state, action) {
        state.votesNum = action.val;
      },
      setVotesVal: function (state, action) {
        state.votesVal = "$" + action.val;
      },
      setProfileImage: function (state, action) {
        state.profileimage = action.val;
      }
    }
  });
/*
var sceneEl = document.querySelector('a-scene');
var entityEl = document.createElement('a-entity');
entityEl.setAttribute('only-desktop','');
sceneEl.appendChild(entityEl);



//AFRAME.utils.entity.setComponentProperty(cameraEl, 'fps-look-controls', 'enabled', true);
//var cameraEl = document.createElement('a-camera');

var sceneEl = document.querySelector('a-scene');

AFRAME.registerComponent('dlux-camera', {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    console.log('I am ready!');
    entityEl.setAttribute('fps-look-controls', 'enabled', true);
  }
});

var entityEl = document.createElement('a-camera');
entityEl.setAttribute('dlux-camera', '');
sceneEl.appendChild(entityEl);

// Desktop enter VR touch controls
window.addEventListener('enter-vr', e => {
  if (!AFRAME.utils.device.checkHeadsetConnected()) {
  //modify cursor
}
});

// Oculus Rift or HTC Vive
AFRAME.registerComponent('rift-vive', {
  init: function () {
    const isRift = !AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected();
  }
});

// Gear VR
AFRAME.registerComponent('gear-vr', {
	init: function () {
		const isGearVR = AFRAME.utils.device.isGearVR();
		let entity = this.el;
		if (isGearVR === true) {

		}
	}
});

// Mobile twoway
AFRAME.registerComponent('only-mobile', {
	init: function () {
		const isMobile = AFRAME.utils.device.isMobile();
		let entity = this.el;
		if (isMobile === true) {
      const camera = document.querySelector('a-camera');
      camera.setAttribute('twoway-motion','speed:35');
		}
	}
});
// Mobile enter VR set fuse and waypoints
window.addEventListener('enter-vr', e => {
  if (AFRAME.utils.device.checkHeadsetConnected() ||
      ARAME.utils.device.isMobile()) {
      // modify cursor

    }


});
// Mobile exit VR set twoway
window.addEventListener('exit-vr', e => {
  if (AFRAME.utils.device.checkHeadsetConnected() ||
      ARAME.utils.device.isMobile()) {
      // modify cursor
      const camera = document.querySelector('a-camera');
      camera.setAttribute('twoway-motion','speed:35');
      // waypoints invisible
     }
});
*/
