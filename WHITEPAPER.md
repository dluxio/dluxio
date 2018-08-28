# dlux Whitepaper

***

Written by @disregardfiat

***

## [dlux.io](https://dlux.io)

## Abstract

Decentralized Limitless User eXperiences is an open source tool for P2P communication of any medium. Utilizing the STEEM blockchain ecosystem our users can trustlessly engage with anyone, anywhere in the world, with out counter-party risk or fees. Anyone can deploy a dApp with an account and a web browser. These dApps are easily modified javascript applications initially utilizing the open-source [Aframe](https://aframe.io) Library. However, any library can be used and any modification to the dlux software can be implemented through the hivemind; HTML5 and Javascript are Turing complete; Thus, any existing or imagined API or library can be utilized to build sharable VR/AR/XR experiences. Having Augmented Reality apps allows us to bring any physical medium to the block chain as long as a link can be passed to a smartphone or future AR device, currently via QR code.

The dlux frontend brings content monetization to literally any medium of communication. This brings STEEMs "Proof of Brain" algorithm and applies it to the world at large in any way we wish to publicly bid for attention. This personal digital signature on good intentions is transparently tracked via the blockchain and reputation will increase for trust-able members of this voluntary community. This allows us to use these applications at large  

### Contents
1 Capabilities
2 Risks
3 Risk Mitigation
4 Use Cases
5 Proof of concept and dual marketing campaign
6 How raised STEEM and SBD from public ICO will be spent
7 Voting Body Elect
8 Incentives and duty for key holders
9 Key Security
10 Software Roadmap
11 ICO Roadmap
12 ICO Distribution
13 DLUX SMT
14 More Information
15 Disclaimers
#### Capabilities
dApps are stored on IPFS and loaded into a sandboxed iFrame with a minimal STEEM wallet API.
##### Social Good
Dicovering content via dlux or though other physical means allows us to reward and incentivize actions that we appreciate and value. This encourages more people to interact and better the world.
##### The unlimited utility
Utilizing any medium of communication means all actions and interactions can be correctly incentivized based on the collective brain of those engaged.
#### Aditional Tools
A web based interactive developement enviroment is availible for building and testing of dApps prior to insertion into the blockchain. A free web based IPFS asset management system is utilized. This allows any connected computer with a modern browser to build VR and AR assets at no additional cost.

#### Risks

* DNS(Domain Name Server) denial:
   This tool can be run locally on any computer with node.js since no database exists off blockchain, the Websockets Signaling Server-"WSS" can prevent current applications from communicating p2p. All applets can be configured to use their own or a 3rd party WSS.(citation) In addition, any steem front-end can be referenced to find a link to an IP address published by @dlux-io
* Non-participation:
   The fewer people that maintain STEEM and DLUX witnesses and contribute content to their network the lower the network value. The inverse is also true.
* Malicious code:
   Users can sign malicious code that may execute vote theft, or phishing schemes. The community can program malicious risk mitigation into a trustable permissions system. As well as maintain moderators and flaggers that can be integrated into discovery systems at will.

#### Risk Mitigation
* WSS and all communication tools can be decentralized.
* dlux software tools can be run from any command line, or located via posts by @dlux-io on any STEEM front-end.
* key management can be moved off steemconnect if necessary.
* utilize ipfs in browser to utilize existing decentralized infrastructure. Can be done currently with an extension and a command line.
* encourage github mirrors. Decentralize ownership.
* witness mirrors, remain a trustless entity
* key security. Deadmans switch to randomly assign a trust-able key if STEEM is "Powered Down" or SBD removed from savings over a thresh hold.


#### Use Cases
Selected use cases:
##### Arts
A mural is painted and a QR code displays the story and information as well as a vote button. 1% DLUXIO is earmarked for a global public arts program.
##### Ridesharing
Bicycles and scooters can be rented for an upvote or micropayment. 1% of DLUXIO is earmarked for a personal mobility program.
##### Infrastructure
Fix a sidewalk or trim a local tree. If anybody appreciates your work they can incentivize you to continue. 1% of DLUXIO is earmarked for the Yensesa Community in West Africa
##### VR Classrom
Visit a new way to incentivize education in virtual reality. Award people who can effectively educate you. 1% of DLUXIO is earmarked for decentralized science.
##### VR Concert
Host a DJ set for your friends around the globe. Interact in real time.
##### Tip Cards
Have a card you can leave at the table so people can tip you for your service.
##### Game
Chess board in park can become AR marker, allowing you to play chess with somebody at a park or chess board around the world.
##### Menu
Paper menu has qr code and menu items, can be ordered and paid for via app.
***
We believe all essential services can be provided through use of this protocol in a purely voluntary manner.
#### Proof of concept and dual marketing campaign
Between September 1 and September 20 2018 an AR contest will be held on STEEM/dlux. People can develop 3d assets, games, art or programs that are cool and interesting. They can publish their submissions to #dluxarcontest from which winners recieve 10,000 DLUXIO from @disregardfiat and @markegiles. Our goal is to have all winners in Los Angeles to present their creations live in a gallery. This art show of course is decentralized and with nothing more than a standard printer can be replicated around the world... and users of some programs will be able to interact in real time with others.
Onboard User experience:
Scans QR code that loads a steem wallet key generation tool. They are guided through username selection, and instructed to take screen captures. They may or maynot provide a recovery email address. Then their public key is shown to the Steemian responsible for the local onboard/art installation(recovery email also passed).

Now they can log in with a copied passcode and their username and save their key to their browser. The app then looks for AR markers and displays a vote botton and winning AR art and experience appropriately as they walk thru the gallery.

Steemian experience: sufficiently high rep account posts that a global pop-up is coming to their neighborhood. They advertise however they like(but hopefully we can generate enough press at ICO along with opening here in Los Angeles with social influencers that other people will be looking for the galleries in their neighborhoods) and then they get paid the account creation fee +10% to correctly incentivize account creation with hopefully enough transparent and auditable attention to onboard without "Sybil".

#### How raised STEEM and SBD from public ICO will be spent
##### Initial STEEM recieved may be spent on:
* Account creation for initial marketing campaign
* Account creation game theory security of ~110% of account creation fee
* Powered up to vote on user content.
##### All SBD recieved:
* Marketing Campaign Overhead
* Key Holder Trust
* Maintenance and overhead, possibly by bid.
#### Voting Body Elect
Using #dluxmod tag along with specific instruction in a post template will enable the 20 elected curators to submit 1 daily submission for vote allocation as well as anybody else. This is analogous to STEEMs witness structure. @dlux-io will vote with daily weight toward these 20 submissions and the top earner from the non-elected pool. Votes will then be cast ~`(vote value-known paid votes this post)/(total_non_paid_votes top 21 posts) LIM11%`. Each #dluxmod post can contain any number of posts that will then be appropriately up voted. Curators are elected by average non-paid upvote amount over 14 days if an elected curator is in last place for 7 days.
#### Incentives and duty for key holders
Daily trust award 250 SBD for 2 key holders with @dlux-io wallet value at 10M scaling to 1000 SBD/Day for a wallet value of 40M and higher.
This is ~2% cost to maintain 10M for 1 year. However, we believe it is financially enough to secure a reasonable lifestyle and can and should remain relatively constant with an upper level salary. Securing 100M with .75% or 1B with .075%. There is only one duty, maintain key security so theft can be avoided.
#### Key Security
Since all ICO funds collected are meant to be allocated based on open algorithms ANY withdrawl or "powering down" of STEEM from @dlux-io is seen as a breach of trust. A deadmans switch will activate which will issue an account recovery request containing a random key from a pool of trusted individuals. The selected key owner will then be the recipient of the daily trust award for continued transparency. @dlux-io wallet corrections will be made and if appropriate, keys returned to their previous custodian. Non-liquid wallet assets should never be subject to theft.

#### Software Roadmap
Regardless of funding, these are the developement goals:
* September 1st: Open beta of AR feature set
* September 15th: Web-based IDE enhancements
* September 25th: Operate a Steem Witness to utilize HiveMind features for dlux
* November: Integrate all external dependencies under dlux.io umbrella

#### ICO Roadmap
* Through September 31st: Friends & Family 5% __[1]__
* October 1st-October 31st: Public ICO 20% __[2]__
* October: Coordinate a global networked AR/VR marketing and steem on-boarding campaign ($0.10 DLUXIO per guest from founders stake)
* November 1st-March 8th: 0.3125% daily __[3]__
* January 15th: SMT Public Testnet
* March 8-20th: Finalizing SMT Launch distribution
* March 24: SMT Go Live and DLUXIO transition to SMT Utility Token

#### ICO Distribution
* 5% friends and family, 0.25% buy in cap.
* 20% first uncapped ICO pool | wait weighted
* 40% 128 daily uncapped pools | wait weighted
* 1% Public Art Endowment
* 1% Personal Mobility Endowment
* 1% SMG Community for teaching artist how to use media
* 1% Yensesa West African Community
* 1% Decentralized Science Endowment
* 15% cofounder @disregardfiat
* 15% cofounder @markegiles
   * Cofounders will equally distribute bounties and marketing tokens as individual entities from personal holdings. Remaining DLUXIO held will be delegated at personal discretion to direct resources toward social goods. No more than 500,000 DLUX SMT of personal holding will be sold per calendar year after SMT distribution.

#### [1] Friends and Family
* 5% allocation = 5,000,000 DLUXIO
* Capped round at $500,000
* Individual purchase cap $25,000 / .25%
* Whitelist
***
#### [2] Public ICO
* 20% allocation = 20,000,000 DLUXIO
* Uncapped
* October 1 - October 31
* Wait Weighted __*__
***
#### [3] Daily micro-offerings
* 0.3125% daily allocation x 128 days = 40,000,000 DLUXIO
* Uncapped
* November 1 - March 8
* Wait Weighted __*__
***
##### * Wait Weighted:
![Graph](https://ipfs.io/ipfs/Qma6dN53rBhkHM8z3W2HciZ2whK2atttUvfh1e5KwdGoiL)
```
WeightedAmount = PurchaseAmount*(Math.sqrt(1-Math.pow((BHo+BHb)/(BHf - BHo), 2)))/2 + 1/2
```
Where `BH` is Blockheight(time), `o` is initial, `f` is final, and `b` Purchase block per round.

This is meant to encourage early price discovery/participation and discourage late entries per round.

### DLUX SMT
#### Reasons
* Better distribute tokens to effect social good
* Content monetization in perpetuity
* DRM
* Gamification and social wellness incentives

#### DLUX SMT information
[Market on Bitshares](https://wallet.bitshares.org/#/market/DLUXIO_STEEM)
* Inflation: 5%APY
   * content creation is rewarded over holding
   * fee-less transactions
   * incentivizes social good by bringing blockchain to reality
* Total starting supply: 100,000,000
* Distribution:
   * Friends and Family 5%
   * Initial Offering 20%
   * Subsequent 128 daily Micro-offerings of 0.3125% totaling 40%
   * Privately held(Otoluxla and contributors) 35%

***
##### SMT Whitepaper Abstract
> Steem’s Smart Media Tokens (SMTs) give anyone the power to launch and sell Proof-of Brain tokens, which are tokens distributed by “upvote” and “like”-based algorithms
and can be integrated with websites to align incentives and spur growth, while websites are
empowered to adopt sustainable, currency-centric revenue models. This model has been
tested and continues to be proven by steemit.com, busy.org, chainbb.com, dsound.audio,
dtube.video and other Steem interfaces, which are monetizing content, tokens and media
in a way never before seen.
Several popular token protocols, such as Ethereum’s ERC-20, allow you to create and
launch arbitrary tokens, but no protocol enables content businesses to leverage those tokens
by aligning incentives between users and applications. Due to suboptimal transaction
cost structures that incur fees for basic actions such as voting or posting, misalignment
of interests between meta and core tokens that aren’t built for influencing distributions
based on Proof-of-Brain, private key hierarchies that don’t cater to social versus financial
operations, and slow transaction speeds that are out of sync with real-time websites - none
of these protocols could ever provide an acceptable user experience for content websites,
such as Twitter, Reddit (even subreddits) or The New York Times.
For content websites and tokens, incentive alignment between websites and users comes
from a steady, as well as decentralized and mathematically guaranteed, release of new
tokens, and incentives that must be allocated to the users - including bloggers, vloggers,
commenters and curators. The distribution of new tokens occurs based on stake-weighted
voting to prevent gaming and eliminate the need for a counterparty. Quality user experience
comes from tokens that can be transacted safely (through separate private keys for
distinct sets of actions), without fees, and at real-time speeds.

[SMT Whitepaper](https://smt.steem.io/smt-whitepaper.pdf)

#### More Information
* [dlux.io](https://dlux.io)
* [Github](github.com/dluxio/dluxio)
* [@dlux-io](https://steemit.com/@dlux-io)
* [Discord](https://discord.gg/Beeb38j)
* [OTOLUX](http://otolux.la)

#### Disclaimers
* Buyers are explicitly purchasing CURRENTLY AVAILIBLE SOFTWARE.
* Buyers are explicitly purchasing an immutable public memo in wallet of @dlux-io on the STEEM blockchain stating good-will instructions for DLUXIO/DLUX SMT dispersment.
* ALL dlux intelectual property is licenced as MIT or CCBY.
* DLUXIO have no uses or rights other than the distribution of the DLUX SMT
* DLUXIO and DLUX SMT may have NO VALUE
* DLUXIO proceeds will be utilized for purposes stated at the discretion of keyholders
* PURCHASE OF DLUXIO TOKENS ARE NON-REFUNDABLE AND PURCHASES CANNOT BE CANCELLED. BUYER MAY LOSE ALL AMOUNTS PAID.
* THESE STATEMENTS HAVE NOT BEEN EVALUATED BY THE SECURITIES AND EXCHANGE COMMISION. While we do not believe these tokens constitute a security US Citizens(and all humans) are reminded buyers carry ALL RISK.
