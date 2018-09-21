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
  AFRAME.scenes[0].emit('updateText', {lineOne: 'Welcome to dlux',lineTwo: 'Share anything!',lineThree: 'Earn rewards!'});
} else {
  // Not Chrome
  console.log('Anything but Chrome')
  AFRAME.scenes[0].emit('updateText', {lineOne: 'Welcome to dlux',lineTwo: 'Share anything!',lineThree: 'Earn rewards!'});
}
};

AFRAME.registerComponent('url', {
  schema: {default: ''},
  init: function () {
          var url = this.data
          this.el.addEventListener('click', function () {
            window.location.href = url
          });
      },
  update: function () {
          var url = this.data
          this.el.addEventListener('click', function () {
                window.location.href = url
              });
          }
    });

AFRAME.registerComponent('vote', {
        schema: {default: ''},
        init: function () {
          var author = this.data.split( '/' )[2]
          //author = author.split( '@' )[1] || 'disregardfiat'
          var permlink = this.data.split( '/' )[3] || 'nope'
          var weight = parseInt(this.data.split( '/' )[4]) || 1
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
          this.el.addEventListener('click', function () {
            AFRAME.scenes[0].emit('delPortals', null);
            getTrending(this.data);
          });
        }
        });
AFRAME.registerComponent('profile', { //trending="tag" to pull another tag, default delux
        schema: {default: ''},
        init: function () {
            AFRAME.scenes[0].emit('delPortals', null);
            if (!this.data) { this.data = 'dlux-io' }
            setDiscussionsByBlog(this.data);
            getAccountInfo(this.data);
          }
        });
AFRAME.registerComponent('new', { //new="username" to pull user feeds, defalt dlux tag
        schema: {default: ''},
        init: function () {
          this.el.addEventListener('click', function () {
            AFRAME.scenes[0].emit('delPortals', null);
            getLatest(this.data);
          });
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
        var cameraRigEl = document.querySelector('#player');
        let cameraEl = this.el;

        // create & add cursor
        var cursorEl = document.querySelector('#myCursor');
        cursorEl.setAttribute('position', '0 0 -1');
        cursorEl.setAttribute('color', cursorColor);

        if (isDesktop === true) { // setup fps controls
    		}
        if (isMobile === true) {
          // enter VR
          window.addEventListener('enter-vr', e => {
            // fuse cursor
            //cursorEl.setAttribute('fuse', true);
            //cursorEl.setAttribute('timeout','100');
          });

          // exit VR
          window.addEventListener('exit-vr', e => {
            // disab  le fuse
            //cursorEl.setAttribute('fuse', false);
          });
        }
        if (isHMD === true) {
          // on enter VR
          window.addEventListener('enter-vr', e => {

            // remove cursor
            cursorEl.parentNode.removeChild(cursorEl);
             // create hands
            var rightCon = document.createElement('a-entity');
            rightCon.setAttribute('id','rightHand');
            rightCon.setAttribute('laser-controls','right');
            rightCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #player; teleportOrigin: #head;');
            //rightCon.setAttribute('networked', 'template:#hand-template;attachTemplateToLocal:false;');

            var leftCon = document.createElement('a-entity');
            leftCon.setAttribute('id','leftHand');
            leftCon.setAttribute('hand-controls','left');
            leftCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #player; teleportOrigin: #head;')
            //leftCon.setAttribute('networked', 'template:#hand-template;attachTemplateToLocal:false;');

            //attach hands
            cameraRigEl.appendChild(rightCon);
            cameraRigEl.appendChild(leftCon);
          });

          // on exit VR
          window.addEventListener('exit-vr', e => {

            // add cursor
            cursorEl.setAttribute('position', '0 0 -1');
            cursorEl.setAttribute('color', cursorColor);
            cameraEl.appendChild(cursorEl);
            var rightCon = document.querySelector('#rightHand')
            var leftCon = document.querySelector('#leftHand')
            //remove hands
            rightCon.parentNode.removeChild(rightCon);
            leftCon.parentNode.removeChild(leftCon);
          });
        }
        if (isGearVR === true) {
          // remove cursor
          cursorEl.parentNode.removeChild(cursorEl);

          // add gear controller
          var rightCon = document.createElement('a-entity');
          rightCon.setAttribute('id','rightHand');
          rightCon.setAttribute('laser-controls','button: trackpaddown');
          rightCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #player; teleportOrigin: #head;');
          cameraRigEl.appendChild(rightCon);

          var leftCon = document.createElement('a-entity');
          leftCon.setAttribute('id','leftHand');
          leftCon.setAttribute('laser-controls','button: trackpaddown');
          leftCon.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #player; teleportOrigin: #head;');
          cameraRigEl.appendChild(leftCon);
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
        function removeMD(md, options) {
  options = options || {};
  options.listUnicodeChar = options.hasOwnProperty('listUnicodeChar') ? options.listUnicodeChar : false;
  options.stripListLeaders = options.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true;
  options.gfm = options.hasOwnProperty('gfm') ? options.gfm : true;
  options.useImgAltText = options.hasOwnProperty('useImgAltText') ? options.useImgAltText : false;

  var output = md || '';

  // Remove horizontal rules (stripListHeaders conflict with this rule, which is why it has been moved to the top)
  output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, '');

  try {
    if (options.stripListLeaders) {
      if (options.listUnicodeChar)
        output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + ' $1');
      else
        output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, '$1');
    }
    if (options.gfm) {
      output = output
        // Header
        .replace(/\n={2,}/g, '\n')
        // Fenced codeblocks
        .replace(/~{3}.*\n/g, '')
        // Strikethrough
        .replace(/~~/g, '')
        // Fenced codeblocks
        .replace(/`{3}.*\n/g, '');
    }
    output = output
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Remove setext-style headers
      .replace(/^[=\-]{2,}\s*$/g, '')
      // Remove footnotes?
      .replace(/\[\^.+?\](\: .*?$)?/g, '')
      .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
      // Remove images
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? '$1' : '')
      // Remove inline links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
      // Remove blockquotes
      .replace(/^\s{0,3}>\s?/g, '')
      // Remove reference-style links?
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
      // Remove atx-style headers
      .replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm, '$1$2$3')
      // Remove emphasis (repeat the line to remove double emphasis)
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
      // Remove code blocks
      .replace(/(`{3,})(.*?)\1/gm, '$2')
      // Remove inline code
      .replace(/`(.+?)`/g, '$1')
      // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
      .replace(/\n{2,}/g, '\n\n');
  } catch(e) {
    console.error(e);
    return md;
  }
  return output;
};
      let portal = {
        key: i,
        visible: true,
        postId: post.id,
        postUrl: post.url,
        author: post.author,
        authorImage: authorData.profile_image,
        title: post.title,
        body: removeMD(post.body).trim().substr(0, 220),
        Hash360: 'https://ipfs.io/ipfs/' + portalImage,
        permlink: post.permlink ,
        rep: steem.formatter.reputation(post.author_reputation),
        votesNum: post.net_votes,
        votesVal: '$' + val,
        category: post.category
      }
      AFRAME.scenes[0].emit('setPortalsIndex', portal);
      });
      if (i == action.length -1) {
        AFRAME.scenes[0].emit('touchState', null);
      }
      }
    }
    const InitPortal = {key: '', visible: false, postId: '', postUrl: '', author: '', authorImage: '', title: '', body: '', Hash360: '', permlink: '', rep: '', votesNum: '', votesVal: '$', category: ''};
    AFRAME.registerState({
      initialState: {
        loggedIn: false,
        loggedInImage:"https://cdn.glitch.com/5ba0e9a1-e1be-470c-be6c-b6bd1b8e349e%2FOTOLUX%20Tag.png?1528445998829",
        username: "Acquiring sync",
        name: "Welcome to dlux",
        userImage:"https://cdn.glitch.com/5ba0e9a1-e1be-470c-be6c-b6bd1b8e349e%2FOTOLUX%20Tag.png?1528445998829",
        userCover:"",
        userRep: "",
        p1: InitPortal,
        p2: InitPortal,
        p3: InitPortal,
        p4: InitPortal,
        p5: InitPortal,
        p6: InitPortal,
        p7: InitPortal,
        p8: InitPortal,
        p9: InitPortal,
        p10: InitPortal,
        p11: InitPortal,
        p12: InitPortal,
        p13: InitPortal,
        p14: InitPortal,
        p15: InitPortal,
        p16: InitPortal,
        p17: InitPortal,
        p18: InitPortal,
        p19: InitPortal,
        p20: InitPortal,
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
        toucher: false,
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
        switch (action.key) {
          case 0:
              state.p1 = action;
              break;
          case 1:
              state.p2 = action;
              break;
          case 2:
              state.p3 = action;
              break;
          case 3:
              state.p4 = action;
              break;
          case 4:
              state.p5 = action;
              break;
          case 5:
              state.p6 = action;
              break;
          case 6:
              state.p7 = action;
              break;
          case 7:
              state.p8 = action;
              break;
          case 8:
              state.p9 = action;
              break;
          case 9:
              state.p10 = action;
              break;
          case 10:
              state.p11 = action;
              break;
          case 11:
              state.p12 = action;
              break;
          case 12:
              state.p13 = action;
              break;
          case 13:
              state.p14 = action;
              break;
          case 14:
              state.p15 = action;
              break;
          case 15:
              state.p16 = action;
              break;
          case 16:
              state.p17 = action;
              break;
          case 17:
              state.p18 = action;
              break;
          case 18:
              state.p19 = action;
              break;
          case 19:
              state.p20 = action;
        }
      },
      touchState: function (state, action) {
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
        state.p1 = InitPortal
        state.p2 = InitPortal
        state.p3 = InitPortal
        state.p4 = InitPortal
        state.p5 = InitPortal
        state.p6 = InitPortal
        state.p7 = InitPortal
        state.p8 = InitPortal
        state.p9 = InitPortal
        state.p10 = InitPortal
        state.p11 = InitPortal
        state.p12 = InitPortal
        state.p13 = InitPortal
        state.p14 = InitPortal
        state.p15 = InitPortal
        state.p16 = InitPortal
        state.p17 = InitPortal
        state.p18 = InitPortal
        state.p19 = InitPortal
        state.p20 = InitPortal
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
