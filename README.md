# dluxio
Decentralized User Experiences

Concept: dlux.io
It is now possible to build virtual reality straight in a web browser. Aframe is a library built on top of three.js that brings object oriented concepts to webGL. Aframe websites have a built in inspector/editor that allows anyone on a desktop to build a 3D scene. Which means a simple recursive query can serialize all the objects in the scene and save them to JSON, format as a post, and store on the block chain. While exploring posts through existing api.steemit.com we can pull hot and new posts, and when loaded reconstruct the 3D scene from posted JSON. Comments can be audio encoded to base64, loaded with positional data, so you know what somebody is referencing in a post. The concept is simple, allow people to share 3d content(load media as textures as well)... provide for free/ad-free creation/storage/exploration, with steem incentive throughout. Limit users only by their imagination.

Technology Stack:
For the broadest possible audience we will be delivering to a web browser. Borrowing a lot from how D.Tube has structured their d-app.

Framework: meteor (utilizing client side only)
Reactive rendering: blaze (aframe has not been playing nice, cdn minified.js has needed to live in head)
Data storage: IPFS
node packages: aframe aframe-extras steemjs sc2-sdk

Roadmap:
Initially limiting to 64kb so we don't have to build asynchronous IPFS loaders quite yet.
Write API calls to get block chain data.
Build standard controllers so people can interact properly mobile/desktop/hmd
Build a menu system in 3D(aframe-gui possibly) to interact via gaze. Can load/unload, play/pause/volume, comment, vote... and link to 2d extras as needed. Needs to be invisible so users can interact with posts, should be called back when users look straight down for more than a second
Build userlogin(hopefully thru steemconnect.v2 so we aren't responsible for keys)
Build a post system that can construct JSON for insertion into block chain. Needs to have check boxes for standard controllers as scene tear down will only give you desktop controllers.
Eventually an asynch IPFS uploader a la D.Tube for larger files, objects, and textures.

How to contribute:
Clone dluxio/dluxio
Have meteor.js
Run "meteor" on your CLI in the dluxio directory.
localhost:3000 is now serving Aframe.
Save changes to the following files to add functionality, reload browser to test
./lib/routes.js :
These are application entry points, allowing hyperlinks/bookmarks to work.
Required:
/ -> loads home
/@:_userid -> loads all dlux blog posts by a user.
/:_postID -> loads a post directly
/login -> takes you to a standard 2D steemconnect login
./client :
./client/main.js : application code, especially blaze elements
./client/main.html : where templates served by blaze live
./client/brain/dlux.js : where aframe and block chain programming live
If you feel like contributing feel free, I intend on delegating all steem rewards not used for overhead from this project to utopian.io to benefit those willing to work on it... including myself.
