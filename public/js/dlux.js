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
// Setup camera depending on device
AFRAME.registerComponent('set-camera', {
	init: function () {
    // check device
		const isDesktop = !AFRAME.utils.device.checkHeadsetConnected();
    const isMobile = AFRAME.utils.device.isMobile();
    const isHMD = !AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected();
    const isGearVR = AFRAME.utils.device.isGearVR();

    var cameraRigEl = document.querySelector('#cameraRig');
    let cameraEl = this.el;
    cameraEl.setAttribute('id','head');
    var cursorEl = document.querySelector('a-cursor');

    if (isDesktop === true) { // setup fps controls
      cameraEl.removeAttribute('look-controls');
      cameraEl.setAttribute('position', '0 0 0');
      cameraEl.setAttribute('fps-look-controls', 'enabled', true);
		}
    if (isMobile === true) { // setup twoway controls and revert to look controls in VR
      cameraEl.removeAttribute('look-controls');
      cameraEl.setAttribute('twoway-motion', 'speed:40');
      // enter VR
      window.addEventListener('enter-vr', e => {
      cameraEl.removeAttribute('twoway-motion');
      cameraEl.setAttribute('look-controls', 'enabled', true);
      // fuse cursor
      cursorEl.setAttribute('fuse','true');
      cursorEl.setAttribute('timeout','100');
      cursorEl.setAttribute('color','#4CC3D9');
      });
      // exit VR
      window.addEventListener('exit-vr', e => {
      cameraEl.removeAttribute('look-controls');
      cameraEl.setAttribute('twoway-motion', 'enabled', true);
      // disable fuse
      cursorEl.setAttribute('fuse','false');
      cursorEl.setAttribute('color','#000');
      });
    }
    if (isHMD === true) { // setup fps controls and revert to look controls in VR
      cameraEl.removeAttribute('look-controls');
      cameraEl.setAttribute('position', '0 0 0');
      cameraEl.setAttribute('fps-look-controls', 'enabled', true);
      // add teleport controllers
      var leftEl = document.createElement('a-entity');
      leftEl.setAttribute('id','left-hand');
      leftEl.setAttribute('hand-controls','left');
      leftEl.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
      leftEl.setAttribute('visible','false');
      cameraRigEl.appendChild(leftEl);
      var rightEl = document.createElement('a-entity');
      rightEl.setAttribute('id','right-hand');
      rightEl.setAttribute('laser-controls','right');
      rightEl.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
      rightEl.setAttribute('visible','false');
      cameraRigEl.appendChild(rightEl);
      // enter VR
      window.addEventListener('enter-vr', e => {
      cameraEl.removeAttribute('fps-look-controls');
      cameraEl.setAttribute('position', '0 0 0');
      cameraEl.setAttribute('look-controls', 'enabled', true);
      leftEl.setAttribute('visible','true');
      rightEl.setAttribute('visible','true');
      });
      // exit VR
      window.addEventListener('exit-vr', e => {
      cameraEl.removeAttribute('look-controls');
      cameraEl.setAttribute('position', '0 0 0');
      cameraEl.setAttribute('fps-look-controls', 'enabled', true);
      leftEl.setAttribute('visible','false');
      rightEl.setAttribute('visible','false');
      });
    }
    if (isGearVR === true) { // add gear controller
      var leftEl = document.createElement('a-entity');
      leftEl.setAttribute('id','left-hand');
      leftEl.setAttribute('gearvr-controls','left');
      cameraRigEl.appendChild(leftEl);
      var rightEl = document.createElement('a-entity');
      rightEl.setAttribute('id','right-hand');
      rightEl.setAttribute('gearvr-controls','right');
      cameraRigEl.appendChild(rightEl);
    }
	}
});
//AFRAME.INSPECTOR.on('inspectormodechanged', function(event){  });
AFRAME.registerComponent('spawn-in-circle', {
  schema: {
    radius: {type: 'number', default: 1}
  },

  init: function() {
    var el = this.el;
    var center = el.getAttribute('position');

    var angleRad = this.getRandomAngleInRadians();
    var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
    var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
    el.setAttribute('position', worldPoint);

    var angleDeg = angleRad * 180 / Math.PI;
    var angleToCenter = -1 * angleDeg + 90;
    el.object3D.rotation.set(0, THREE.Math.degToRad(angleToCenter), 0);
  },

  getRandomAngleInRadians: function() {
    return Math.random()*Math.PI*2;
  },

  randomPointOnCircle: function (radius, angleRad) {
    var x = Math.cos(angleRad)*radius;
    var y = Math.sin(angleRad)*radius;
    return {x: x, y: y};
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
