# dluxio
##Decentralized User Experiences

### Concept: dlux.io
It is now possible to build virtual reality straight in a web browser. Aframe is a library built on top of three.js that brings object oriented concepts to webGL. Aframe websites have a built in inspector/editor that allows anyone on a desktop to build a 3D scene. Which means a simple recursive query can serialize all the objects in the scene and save them to JSON, format as a post, and store on the block chain. While exploring posts through existing api.steemit.com we can pull hot and new posts, and when loaded reconstruct the 3D scene from posted JSON. Comments can be audio encoded to base64, loaded with positional data, so you know what somebody is referencing in a post. The concept is simple, allow people to share 3d content(load media as textures as well)... provide for free/ad-free creation/storage/exploration, with steem incentive throughout. Limit users only by their imagination.

### Technology Stack:
For the broadest possible audience we will be delivering to a web browser.

* Framework: Express
* Data storage: 64kb on blockchain -> IPFS
* node packages: aframe aframe-extras sc2-sdk

### Roadmap:
* 64kb will be a storage limit until IPFS and an async uploaded is coded.
* Maintain a control system for HMD/desktop/mobile
* Build a menu system in 3D(aframe-gui possibly) to interact via gaze.
* Build a post system that can construct JSON (GFTL) from the scene for insertion into block chain.
* Eventually an asynch IPFS uploader a la D.Tube for larger files, objects, and textures.



### How to contribute:

Clone dluxio/dluxio.

' $ npm install '
' $ npm start '

localhost:3000 is now serving Aframe.

If you feel like contributing feel free, I intend on delegating all steem rewards not used for overhead from this project to utopian.io to benefit those willing to work on it... including myself.

### Current Progress
 @sambillingham has made steem-boilerplate availible and I am currently extending this to add a parallel VRpost mechanic and route to display VRhyperlinks
