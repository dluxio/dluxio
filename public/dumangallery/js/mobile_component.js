AFRAME.registerComponent('mobile', {
    init: function () {

        if( AFRAME.utils.device.isMobile() ){
            /* Add mobile controls */
            var scene = document.querySelector('a-scene');
            var entityEl = document.createElement('a-entity');

            //entityEl.setAttribute('id', 'something');

            entityEl.setAttribute('position', {x:0, y: 1.764, z: 0});
            entityEl.setAttribute('camera','camera');


            /* *** */
            var innerEl = document.createElement('a-entity');
            
			innerEl.setAttribute('cursor', {
				maxDistance: 30,
				fuse: true,
				fuseTimeout: 50,
			});
			
            innerEl.setAttribute('position', {x:0, y: 0, z: -1});

            innerEl.setAttribute('geometry', {
                primitive: 'ring',
                radiusInner: 0.02,
                radiusOuter: 0.03
            });

            innerEl.setAttribute('material', {
                color: '#CCC',
                shader: 'flat'
            });

            /* *** */
            entityEl.appendChild(innerEl);

            scene.appendChild(entityEl);
			
        }

    },

    update: function(){

    },

    tick: function(){

    },

    remove: function(){

    }
});

/*    <a-entity camera mobile
                universal-controls="movementControls: checkpoint"
                checkpoint-controls="mode: animate"
                position="0 1.764 0">

        <a-entity cursor="maxDistance: 30"
                  position="0 0 -1"
                  geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                  material="color: #CCC; shader: flat;">
        </a-entity>
      </a-entity>*/