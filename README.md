# dluxio
## Decentralized Limitless User Experiences

A community driven decentralized project that aims to provide VR as a decentralized alternative to social media/media distribution that is inherently monetized. Also AR as an alternative to extra devices for modern points of interactivity; terminals and points-of-sale.

[![Waffle.io - Columns and their card count](https://badge.waffle.io/dluxio/dluxio.svg?columns=all)](https://waffle.io/dluxio/dluxio)

### How it works:

dlux is a steem dApp that serves webXR which queries the steem blockchain client side for data. Steem posts act as a monetized vessel that contains IPFS addresses in metadata. When a post is loaded an iFrame is served full screen that contains the XR scene; the parent window has steem wallet API which allows preconfigured window messages to trigger transactions like vote, dApp navigation, and generate hot signing link. XR scenes are uploaded to IPFS, and a post containing their static references are inserted into the blockchain by users. dlux.io also maintains a webRTC signaling server which connects XR viewers in individual posts, allowing p2p avatar interactions and voice chat. The free full featured starter pack for building VR experience can be [remixed here](https://glitch.com/edit/#!/cheerful-suggestion) and the AR version [here.](https://glitch.com/edit/#!/pollen-gem)

### Trying to make a VR post? Start here:
[Remix this!](https://glitch.com/edit/#!/remix/dlux-vr)

### Trying to make an AR post? Start here:
[Remix this!](https://glitch.com/edit/#!/pollen-gem)

### Technology Stack:
For the broadest possible audience we are delivering to a web browser.

* Framework: Express
* Data storage: 64kb on blockchain -> IPFS
* node packages: networked-aframe-instance(wss) steemconnect qr-image
* client side: aframe networked-aframe steemjs arjs

### How to contribute:

[Github dluxio/dluxio](https://github.com/dluxio/dluxio)

[Discord](https://discord.gg/Beeb38j)

### Run dlux locally
Everything about dlux except for the domain in posted hyperlinks is decentralized.

> Caution, potential security risk: The steemconnect default localhost credentials are public, if somebody gets your access token/localhost cookie they can trigger scope actions such as vote and post on your behalf, running ipfs content from a localhost node may present a XSS vector.

Have node installed, clone our .git
```
dluxio$ npm install
dluxio$ npm start
```
navigate to `localhost:3000`

### Contributors

* @disregardfiat - Steven Ettinger
* @markegiles - Mark E Giles

### Many Thanks
The A-frame community at large. Especially if you've written tutorials or answered questions on SO:
@ngokevin, @donmccurdy, @haydenlee, etc etc
All the open-source developers and companies that believe in open protocols. The developers, witnesses, and users/believers of the steem blockchain.
Further contributors prove Creative Commons & MIT licensing can be blended with proof of brain rewards to further our development as a society :)
