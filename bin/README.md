# dluxio
## Decentralized Limitless User Experiences

### Concept
It is now possible to build virtual reality straight in a web browser. Aframe is a library built on top of three.js that brings object oriented concepts to webGL. Aframe websites have a built in inspector/editor that allows anyone on a desktop to build a 3D scene. Which means a simple recursive query can serialize all the objects in the scene and save them to JSON, format as a post, and store on the block chain. While exploring posts through existing api.steemit.com we can pull hot and new posts, and when loaded reconstruct the 3D scene from posted JSON. Comments can be audio encoded to base64, loaded with positional data, so you know what somebody is referencing in a post. The concept is simple, allow people to share 3d content(load media as textures as well)... provide for free/ad-free creation/storage/exploration, with steem incentive throughout. Limit users only by their imagination.

### How it works:

dlux.io will serve this application as a reference to IPFS. The users web browser will then begin running and Aframe be served by a contained express framework. That framework will make calls to existing steemnodes(or our own in the future). Metadata stored with our content as well as parsed out of other content will then render a-links. Our content will look like doorways, utilizing the 360camera capture in aframe. Others will look like banners for movies, or simple photos. From this screen we should be able to see normal information about whats behind the links, author, value... call up text information and see comments... maybe by interacting with a button or clipboard.

Each single post will load a 3d environment for the users, placing them in a theater to watch streaming and static content... or in a "post" which could be the oscars, where they stream volumetric video P2P saving in bandwidth, owning their content and letting everyone be paid to watch. But for now, it will simply render a static environment. Until we build in the ability to load script elements posts will be static. However, there should be no issue at all incorporating games, a-painter, and any other tech into this stack. There is no limit.

There are no ad mechanisms, the interface can be clean and functional, ultimately customizable, initially minimalistic.

Ordering these links to user/feed or category/feed. Having a callable menu that allows common/navbar tasks, as well as media player functionality.

### Technology Stack:
For the broadest possible audience we will be delivering to a web browser.

* Framework: Express
* Data storage: 64kb on blockchain -> IPFS
* node packages: aframe aframe-extras sc2-sdk ipfs-api

### Roadmap:
* Build IPFS network storage integration.
* Work to build VR interface.
* Work metadata to be able to display most amount of content.
* Build upon posting and reconstruction mechanisms to provide a functional experience.
* Build in social aspects and steem integration(like a post, like a post within a post), comment with motion cap, screen grabs, audio input... rich media

### How to contribute:

Clone dluxio/dluxio.


$ npm install

$ npm start

localhost:3000 will now ask you to log in to steemconnect.
There is a 3D welcome screen that leads to a stripped down steem client, which is perfect to build a minimalist 3D interface. There is a create VR post button that loads a forked aframe-inspector that allows you to save a scene directly to IPFS. This is a proof of concept, post preview as well as integrating scripting is imperative moving forward. After a metadata tree is designed A frame will then reconstruct the posted environment. A proof of concept is up at dlux.io/alpha

If you feel like contributing feel free, I intend on delegating all steem rewards not used for overhead from this project to utopian.io to benefit those willing to work on it... including myself. [Join discord](https://discord.gg/Beeb38j)

### Many Thanks
@sambillingham - STEEM boilerplate
