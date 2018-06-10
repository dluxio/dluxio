# dluxio
## Decentralized Limitless User Experiences

A community driven decentralized project that aims to provide VR as a decentralized alternative to social media/media distribution that is inherently monetized.

[![Waffle.io - Columns and their card count](https://badge.waffle.io/dluxio/dluxio.svg?columns=all)](https://waffle.io/dluxio/dluxio)

### How it works:

dlux is a steem dApp that serves webVR which queries the steem blockchain client side for data. Steem posts act as a monetized vessel that contains IPFS addresses in metadata. When a post is loaded an iFrame is served full screen that contains the VR scene; the parent window has steem wallet API which allows preconfigured window messages to trigger transactions like vote, and dApp navigation. VR scenes are uploaded to IPFS, and a post containing their static references are inserted into the blockchain by users. dlux.io also maintains a webRTC signaling server which connects VR viewers in individual posts, allowing p2p avatar interactions and voice chat. The free full featured starter pack for building experience can be [remixed here.](https://glitch.com/edit/#!/cheerful-suggestion)

### Trying to make a VR post? Start here:
[Remix this!](https://glitch.com/edit/#!/cheerful-suggestion)

### Technology Stack:
For the broadest possible audience we are delivering to a web browser.

* Framework: Express
* Data storage: 64kb on blockchain -> IPFS
* node packages: networked-aframe steemconnect
* client side: aframe networked-aframe steemjs

### Roadmap:

Check out our [Waffle board](https://waffle.io/dluxio/dluxio/join)

### How to contribute:

[Github dluxio/dluxio](https://github.com/dluxio/dluxio)
[Waffle board](https://waffle.io/dluxio/dluxio/join)
[Discord](https://discord.gg/Beeb38j)

Have node installed, clone our github:
```
dluxio$ npm install
dluxio$ npm start
```
navigate to `localhost:3000` which will now ask you to log in to steemconnect.
There is a VR welcome screen that leads to a single page steem explorer. There is a hidden `/post` feature that stores a blog post with an reference to an IPFS hash.

### Contributors

* @disregardfiat - Steven Ettinger | Technical Lead
* @markegiles - Mark E Giles | Project Lead

### Many Thanks
@sambillingham - STEEM boilerplate
