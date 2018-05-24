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
