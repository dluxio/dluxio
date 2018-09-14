function doOnLoad () {
  isChrome();
}
function isChrome () {
// Check for chrome to alert user they may not be seeing everything
var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
   // is Google Chrome on IOS
   AFRAME.scenes[0].emit('updateText', {lineOne: 'Welcome to dlux',lineTwo: 'Mobile Chrome is untested.',lineThree: 'Please use firefox'});
   console.log('Moble Chrome')
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
  // Chrome
  console.log('Chrome :(')
  AFRAME.scenes[0].emit('updateText', {lineOne: 'Welcome to dlux',lineTwo: 'Chrome detected! Please',lineThree: 'use firefox to see portals.'});
} else {
  // Not Chrome
  console.log('Anything but Chrome')
  AFRAME.scenes[0].emit('updateText', {lineOne: 'Welcome to dlux',lineTwo: 'Share anything!',lineThree: 'Earn rewards!'});
}
};

AFRAME.registerComponent('url', {
  schema: {default: ''},
  init: function () {
          var url = this.data;
          this.el.addEventListener('click', function () {
            window.location.href = url;
          });
      }
    });
AFRAME.registerComponent('vote', {
        schema: {default: ''},
        init: function () {
          console.log(this.data)
          var author = this.data.split( '/' )[2]
          author = author.split( '@' )[1]
          console.log(author)
          var permlink = this.data.split( '/' )[3]
          console.log(permlink)
          var weight = parseInt(this.data.split( '/' )[4])
          console.log(weight)
          var voteMessage = {'permlink': permlink, 'author': author, 'weight': weight}
          this.el.addEventListener('click', function () {
            aVote(voteMessage);
            //this.setAttribute('visible', false);
          });
        }
      });
AFRAME.registerComponent('trending', { //trending="tag" to pull another tag, default delux
        schema: {default: ''},
        init: function () {
            AFRAME.scenes[0].emit('delPortals', {portalObj: portal});
            getTrending(this.data);
          }
        });
AFRAME.registerComponent('profile', { //trending="tag" to pull another tag, default delux
        schema: {default: ''},
        init: function () {
            AFRAME.scenes[0].emit('delPortals', {portalObj: portal});
            if (!this.data) { this.data = 'dlux-io' }
            setDiscussionsByBlog(this.data);
            getAccountInfo(this.data);
          }
        });
AFRAME.registerComponent('new', { //new="username" to pull user feeds, defalt dlux tag
        schema: {default: ''},
        init: function () {
            AFRAME.scenes[0].emit('delPortals', {portalObj: portal});
            getLatest(this.data);
      }
    });
AFRAME.registerComponent('show-info', {
      schema: {
      show: {default: ''}
      },
      init: function() {
        var el = this.el;
        var showEl = el.querySelector('.hidebutton');
        //mouseenter
        el.addEventListener('mouseenter', function() {
          showEl.setAttribute('visible', true);
        });
        //mouseleave
        el.addEventListener('mouseleave', function() {
          showEl.setAttribute('visible', false);
        });
      }
    });
AFRAME.registerComponent('show-menu', {
      schema: {
      show: {default: ''}
      },
      init: function() {
        var el = this.el;
        var showEl = el.querySelector('.hiddenMenu');
        //mouseenter
        el.addEventListener('mouseenter', function() {
          showEl.setAttribute('visible', true);
        });
        //mouseleave
        el.addEventListener('mouseleave', function() {
          showEl.setAttribute('visible', false);
        });
      }
    });
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
AFRAME.registerComponent('set-camera', {
    	init: function () {
        // check device
    		const isDesktop = !AFRAME.utils.device.checkHeadsetConnected();
        const isMobile = AFRAME.utils.device.isMobile();
        const isHMD = !AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected();
        const isGearVR = AFRAME.utils.device.isGearVR();
        const cursorColor = '#4CC3D9'; //change cursor color
        var cameraRigEl = document.querySelector('#cameraRig');
        let cameraEl = this.el;
        cameraEl.setAttribute('id','head');
        var cursorEl = document.createElement('a-cursor');
        cursorEl.setAttribute('position', '0 0 -1');

        cursorEl.setAttribute('color','cursorColor');

        if (isDesktop === true) { // setup fps controls
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('position', '0 0 0');
          cameraEl.setAttribute('fps-look-controls', true);
          cameraEl.appendChild(cursorEl);
    		}
        if (isMobile === true) { // setup twoway controls
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('twoway-motion', 'speed:40');
          cursorEl.setAttribute('fuse', false);
          cursorEl.setAttribute('color','#000');
          cameraEl.appendChild(cursorEl);
          // enter VR
          window.addEventListener('enter-vr', e => {
            // fuse cursor
            cursorEl.setAttribute('fuse', true);
            cursorEl.setAttribute('timeout','100');
            cursorEl.setAttribute('color','cursorColor');
          });
          // exit VR
          window.addEventListener('exit-vr', e => {
          // disable fuse
            cursorEl.setAttribute('fuse', false);
            cursorEl.setAttribute('color','#000');
          });
        }
        if (isHMD === true) {
          // switch to fps controls
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('position', '0 0 0');
          cameraEl.setAttribute('fps-look-controls', true);
          // add hands
          var rightCon = document.createElement('a-entity');
          rightCon.setAttribute('id','right-hand');
          rightCon.setAttribute('laser-controls','right');
          rightCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
          var leftCon = document.createElement('a-entity');
          leftCon.setAttribute('id','left-hand');
          leftCon.setAttribute('hand-controls','left');
          leftCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
          // add cursor
          cameraEl.appendChild(cursorEl);
          // enter VR - switch to look controls, remove cursor, add controllers
          window.addEventListener('enter-vr', e => {
            // switch to look controls
            cameraEl.removeAttribute('fps-look-controls');
            cameraEl.setAttribute('position', '0 0 0');
            cameraEl.setAttribute('look-controls', true);
            // remove cursor
            cursorEl.parentNode.removeChild(cursorEl);
            //attach hands
            cameraRigEl.appendChild(rightCon);
            cameraRigEl.appendChild(leftCon);
          });
          // exit VR - switch to fps controls, add cursor, remove controllers
          window.addEventListener('exit-vr', e => {
            // switch to fps controls
            cameraEl.removeAttribute('look-controls');
            cameraEl.setAttribute('position', '0 0 0');
            cameraEl.setAttribute('fps-look-controls', true);
            // add cursor
            cursorEl.setAttribute('position', '0 0 -1');
            cursorEl.setAttribute('color','cursorColor');
            cameraEl.appendChild(cursorEl);
            //remove hands
            rightCon.parentNode.removeChild(rightCon);
            leftCon.parentNode.removeChild(leftCon);
          });
        }
        if (isGearVR === true) {
          // remove cursor added by mobile
          cursorEl.parentNode.removeChild(cursorEl);
          // add gear controller
          var leftCon = document.createElement('a-entity');
          leftCon.setAttribute('id','left-hand');
          leftCon.setAttribute('laser-controls','button: trackpaddown');
          leftCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
          cameraRigEl.appendChild(leftCon);
          var rightCon = document.createElement('a-entity');
          rightCon.setAttribute('id','right-hand');
          rightCon.setAttribute('laser-controls','button: trackpaddown');
          rightCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
          cameraRigEl.appendChild(rightCon);
        }
    	}
    });


  function voteMsg(message) {
    AFRAME.scenes[0].emit('setVoteMsg', {val: message});
  }
  function setDiscussionsByBlog (query, initial) {
    var queryI = { tag: 'dlux', limit: 99 }
    if(query) {queryI = { tag: query, limit: 99 }}
    steem.api.getDiscussionsByBlog(queryI, (err, result) => {
      var filteredResults = []
      for (i = 0; i < result.length; i++) {
        var vr = JSON.parse(result[i].json_metadata).vrHash
          if (vr) {
            filteredResults.push(result[i])
          }
        }
        setPortals(filteredResults)
      })
    }
  function getTrending(query, initial){
    var queryI = { tag: 'dlux', limit: 99 }
    if(query) {queryI = { tag: query, limit: 99 }}
    steem.api.getDiscussionsByTrending(queryI, (err, result) => {
      if (err === null) {
        var filteredResults = []
        for (i = 0; i < result.length; i++) {
          let vr = JSON.parse(result[i].json_metadata).vrHash
          if (vr) {
            filteredResults.push(result[i])
            }
          }
          setPortals(filteredResults)
        } else {
          console.log(err);
        }
      });
    }
  function getLatest(query, initial){
    var queryI = { tag: 'dlux', limit: 99 }
    if(query) {queryI = { tag: query, limit: 99 }}
    steem.api.getDiscussionsByCreated(queryI, (err, result) => {
      if (err === null) {
        var filteredResults = []
        for (i = 0; i < result.length; i++) {
          let vr = JSON.parse(result[i].json_metadata).vrHash
          if (vr) {
            filteredResults.push(result[i])
            }
          }
          setPortals(filteredResults)
        } else {
          console.log(err);
        }
    });
  }
  function aVote(message) {
    $.post({
      url: '/post/vote/',
      dataType: 'json',
      data: {
        'permlink': message.permlink,
        'author': message.author,
        'weight': message.weight
      }}, (response) => {
        console.log(response)
        //feedback here, likely emit a hide vote button function?
      });
    }
    function generateProfileData(author){
      let authorData
      steem.api.getAccounts([author], (err, result) => {
        let user = result[0]
        let jsonData = JSON.parse(user.json_metadata)
        let profileData = jsonData.profile
        authorData = {
          about: profileData.about,
          avatar: profileData.avatar,
          bitcoin: profileData.bitcoin,
          cover_image: profileData.cover_image,
          ethereum: profileData.ethereum,
          facebook: profileData.facebook,
          github: profileData.github,
          instagram: profileData.instagram,
          linkedin: profileData.linkedin,
          location: profileData.location,
          name: profileData.name,
          profile_image: profileData.profile_image,
          signature: profileData.signature,
          twitter: profileData.twitter,
          website: profileData.website,
          youtube: profileData.youtube,
          vrhome: profileData.vrhome
        }
        return authorData;
    });
  }
  function setImage(username) {
      var c = getCookie('usrImg');
      if (c !== '') {
      AFRAME.scenes[0].emit('setLoggedInImage', {val: c});
      } else {
      steem.api.getAccounts([username], (err, result) => {
        let user = result[0]
        let jsonData = JSON.parse(user.json_metadata)
        let profileData = jsonData.profile
        AFRAME.scenes[0].emit('setLoggedInImage', {val: profileData.profile_image});
        setCookie('usrImg', profileData.profile_image, 300)
      });
    }
    }
    function getAccountInfo(username) {
      steem.api.getDynamicGlobalProperties((err, result) => {
        let totalVestingShares = result.total_vesting_shares;
        let totalVestingFundSteem = result.total_vesting_fund_steem;
        steem.api.getAccounts([username], (err, result) => {
          let user = result[0]
          let jsonData;
          // steem power calc
          let vestingShares = user.vesting_shares;
          let delegatedVestingShares = user.delegated_vesting_shares;
          let receivedVestingShares = user.received_vesting_shares;
          let steemPower = steem.formatter.vestToSteem(vestingShares, totalVestingShares, totalVestingFundSteem);
          let delegatedSteemPower = steem.formatter.vestToSteem((receivedVestingShares.split(' ')[0])+' VESTS', totalVestingShares, totalVestingFundSteem);
          let outgoingSteemPower = steem.formatter.vestToSteem((receivedVestingShares.split(' ')[0]-delegatedVestingShares.split(' ')[0])+' VESTS', totalVestingShares, totalVestingFundSteem) - delegatedSteemPower;
          // vote power calc
          let lastVoteTime = (new Date - new Date(user.last_vote_time + "Z")) / 1000;
          let votePower = user.voting_power += (10000 * lastVoteTime / 432000);
          votePower = Math.min(votePower / 100, 100).toFixed(2);

          steem.api.getFollowCount(user.name, function(err, result){
            let followerCounter = result.follower_count
            let followingCounter = result.following_count
            var authorData
            //Plankton = up to 1 MVESTS aka Newbie/User on the charts below
            //Minnow = >1 to 10 MVESTS aka SuperUser " " "
            //Dolphin = >10 to 100 MVESTS aka Hero " " "
            //Orca = >100 to 1,000 MVESTS aka SuperHero " "
            //Whale = >1,000 MVESTS aka Legend " "
            steem.api.getAccounts([user.name], (err, result) => {
              let user = result[0]
              let jsonData = JSON.parse(user.json_metadata)
              let profileData = jsonData.profile
              authorData = {
                about: profileData.about,
                avatar: profileData.avatar,
                bitcoin: profileData.bitcoin,
                cover_image: profileData.cover_image,
                ethereum: profileData.ethereum,
                facebook: profileData.facebook,
                github: profileData.github,
                instagram: profileData.instagram,
                linkedin: profileData.linkedin,
                location: profileData.location,
                name: profileData.name,
                profile_image: profileData.profile_image,
                signature: profileData.signature,
                twitter: profileData.twitter,
                website: profileData.website,
                youtube: profileData.youtube,
                vrhome: profileData.vrhome
              }
          let data = {
            name: authorData.name,
            userImage: authorData.profile_image,
            cover: authorData.cover_image,
            rep: steem.formatter.reputation(user.reputation),
            effectiveSp: parseInt(steemPower  + delegatedSteemPower - -outgoingSteemPower),
            sp: parseInt(steemPower).toLocaleString(),
            delegatedSpIn: parseInt(delegatedSteemPower).toLocaleString(),
            delegatedSpOut: parseInt(-outgoingSteemPower).toLocaleString(),
            vp: votePower,
            steem: user.balance.substring(0, user.balance.length - 5),
            sbd: user.sbd_balance.substring(0, user.sbd_balance.length - 3),
            numOfPosts: user.post_count,
            followerCount: followerCounter,
            followingCount: followingCounter,
            usdValue: steem.formatter.estimateAccountValue(user),
            username: user.name,
            createdDate: new Date (user.created)
          }
          AFRAME.scenes[0].emit('setData', {val: data});
        });
        });
        });
      });
    }
    function setPortals(action) {

      //if (!action.initial) {action.result.shift()}
      for (let i = 0; i < action.length ; i++) {
        let post = action[i];
        var authorData
        steem.api.getAccounts([post.author], (err, result) => {
          let user = result[0]
          let jsonData = JSON.parse(user.json_metadata)
          let profileData = jsonData.profile
          authorData = {
            about: profileData.about,
            avatar: profileData.avatar,
            bitcoin: profileData.bitcoin,
            cover_image: profileData.cover_image,
            ethereum: profileData.ethereum,
            facebook: profileData.facebook,
            github: profileData.github,
            instagram: profileData.instagram,
            linkedin: profileData.linkedin,
            location: profileData.location,
            name: profileData.name,
            profile_image: profileData.profile_image,
            signature: profileData.signature,
            twitter: profileData.twitter,
            website: profileData.website,
            youtube: profileData.youtube,
            vrhome: profileData.vrhome
          }
          var val = 0
        if (Math.round( parseFloat(post.pending_payout_value.substring(0,5)) * 100) / 100 > 0) {
          val = Math.round( parseFloat(post.pending_payout_value.substring(0,5)) * 100) / 100
        } else {
          val = Math.round( parseFloat(post.total_payout_value.substring(0,5)) * 100) / 100
        }
        var portalImage = JSON.parse(post.json_metadata).Hash360
        if (portalImage.split('/')[3] == 'ipfs') {
        portalImage = portalImage.split('/')[4];
        }
      let portal = {
        postId: post.id,
        postUrl: post.url,
        author: post.author,
        authorImage: authorData.profile_image,
        title: post.title,
        body: post.body,
        Hash360: portalImage,
        permlink: post.permlink ,
        rep: steem.formatter.reputation(post.author_reputation),
        votesNum: post.net_votes,
        votesVal: '$' + val,
        category: post.category
      }
      AFRAME.scenes[0].emit('addToPortals', {portalObj: portal});
      });
      }
      AFRAME.scenes[0].emit('setPortalsIndex', null);
    }
    AFRAME.registerState({
      initialState: {
        loggedIn: false,
        loggedInImage:"https://cdn.glitch.com/5ba0e9a1-e1be-470c-be6c-b6bd1b8e349e%2FOTOLUX%20Tag.png?1528445998829",
        username: "Acquiring sync",
        name: "Welcome to dlux",
        userImage:"https://cdn.glitch.com/5ba0e9a1-e1be-470c-be6c-b6bd1b8e349e%2FOTOLUX%20Tag.png?1528445998829",
        userCover:"",
        userRep: "",
        portals: [],
        portalIndex: 0,
        portalCat: "",
        portalSub: "dlux-io",
        votePower: "%",
        voteValue: "$",
        voteCurrentWeight: "100%",
        sp: "3",
        delegatedSpIn: "4",
        delegatedSpOut: "5",
        effectiveSp: "6",
        vp: "7",
        steem: "8",
        sbd: "9",
        numOfPosts: "10",
        followerCount: "55",
        followingCount: "77",
        usdValue: "45",
        createdDate: "ago",
        menuVis: false,
        portalToucher: false,
        lineOne: '',
        lineTwo: '',
        lineThree: ''
      },
      handlers: {
        setLoggedIn: function (state, action) {
          state.loggedIn = action.val;
        },
        setData: function (state, action) {
          state.name = action.val.name
          state.username = action.val.username
          state.userImage = action.val.userImage
          state.cover = action.val.cover
          state.userRep = action.val.rep
          state.effectiveSp = action.val.effectiveSp
          state.sp = action.val.sp
          state.delegatedSpIn = action.val.delegatedSpIn
          state.delegatedSpOut = action.val.delegatedSpOut
          state.vp = action.val.vp
          state.steem = action.val.steem
          state.sbd = action.val.sbd
          state.numOfPosts = action.val.numOfPosts
          state.followerCount = action.val.followerCount
          state.followingCount = action.val.followingCount
          state.usdValue = action.val.usdValue
          state.createdDate = action.val.createdDate
        },
        setcreatedDate: function (state, action) {
          state.createdDate = action.val;
        },
        setusdValue: function (state, action) {
          state.usdValue = action.val;
        },
        setLoggedInImage: function (state, action) {
          state.loggedInImage = action.val;
        },
        setfollowingCount: function (state, action) {
          state.followingCount = action.val;
        },
        setfollowerCount: function (state, action) {
          state.followerCount = action.val;
        },
        setnumOfPosts: function (state, action) {
          state.numOfPosts = action.val;
        },
        setsbd: function (state, action) {
      state.sbd = action.val;
      },
      setsteem: function (state, action) {
        state.steem = action.val;
      },
      setvp: function (state, action) {
        state.vp = action.val;
      },
      seteffectiveSp: function (state, action) {
        state.effectiveSp = action.val;
      },
      setdelegatedSpIn: function (state, action) {
        state.delegatedSpIn = action.val;
      },
      setdelegatedSpOut: function (state, action) {
        state.delegatedSpOut = action.val;
      },
      setsp: function (state, action) {
        state.sp = action.val;
      },
      setUsername: function (state, action) {
        state.username = '@' + action.val;
      },
      setUserImage: function (state, action) {
        state.userImage = action.val;
      },
      setUserCover: function (state, action) {
        state.userCover= action.val;
      },
      setUserRep: function (state, action) {
        state.userRep = action.val;
      },
      funwithportals: function (state, action) {
        state.portals = action.val;
      },
      setPortalsIndex: function (state, action) {
        state.portals.__dirty = true;
      },
      setPortalCat: function (state, action) {
        state.portalCat = action.val;
      },
      setVotePower: function (state, action) {
        state.votePower = action.val;
      },
      setUserValue: function (state, action) {
        state.voteValue = action.val;
      },
      setVoteCurrentWeight: function (state, action) {
        state.voteCurrentWeight = action.val;
      },
      setMenuVis: function (state, action) {
        state.menuVis = !state.menuVis;
      },
      addToPortals: function (state, action) {
        state.portals.push(action.portalObj);
      },
      updateText: function (state, action) {
        state.lineOne = action.lineOne;
        state.lineTwo = action.lineTwo;
        state.lineThree = action.lineThree;
      },
      delPortals: function (state, action) {
        state.portals = [];
      }
    }
  });


  function setCookie(cname, cvalue, exmins) {
      var d = new Date();
      d.setTime(d.getTime() + (exmins*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
