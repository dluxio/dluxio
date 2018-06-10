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
        var permlink = this.data.split( '/' )[2]
        var author = this.data.split( '/' )[1]
        var weight = this.data.split( '/' )[3]
        var voteMessage = {'parmlink': permlink, 'author': author, 'weight': weight}
        this.el.addEventListener('click', function () {
         aVote(voteMessage);
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
        var cameraRigEl = document.querySelector('#cameraRig');
        let cameraEl = this.el;
        cameraEl.setAttribute('id','head');
        var cursorEl = document.querySelector('a-cursor');
        if (isDesktop === true) { // setup fps controls
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('position', '0 0 0');
          cameraEl.setAttribute('fps-look-controls', 'enabled', true);
    		}
        if (isMobile === true) { // setup twoway controls and revert to look controls in VR
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('twoway-motion', 'speed:40');
          // enter VR
          window.addEventListener('enter-vr', e => {
          cameraEl.removeAttribute('twoway-motion');
          cameraEl.setAttribute('look-controls', 'enabled', true);
          // fuse cursor
          cursorEl.setAttribute('fuse','true');
          cursorEl.setAttribute('timeout','100');
          cursorEl.setAttribute('color','#4CC3D9');
          });
          // exit VR
          window.addEventListener('exit-vr', e => {
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('twoway-motion', 'enabled', true);
          // disable fuse
          cursorEl.setAttribute('fuse','false');
          cursorEl.setAttribute('color','#000');
          });
        }
        if (isHMD === true) { // setup fps controls and revert to look controls in VR
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('position', '0 0 0');
          cameraEl.setAttribute('fps-look-controls', 'enabled', true);
          // add teleport controllers
          var leftEl = document.createElement('a-entity');
          leftEl.setAttribute('id','left-hand');
          leftEl.setAttribute('hand-controls','left');
          leftEl.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
          leftEl.setAttribute('visible','false');
          cameraRigEl.appendChild(leftEl);
          var rightEl = document.createElement('a-entity');
          rightEl.setAttribute('id','right-hand');
          rightEl.setAttribute('laser-controls','right');
          rightEl.setAttribute('teleport-controls', 'button: trigger; collision-entities: #env; cameraRig: #cameraRig; teleportOrigin: #head;');
          rightEl.setAttribute('visible','false');
          cameraRigEl.appendChild(rightEl);
          // enter VR
          window.addEventListener('enter-vr', e => {
          cameraEl.removeAttribute('fps-look-controls');
          cameraEl.setAttribute('position', '0 0 0');
          cameraEl.setAttribute('look-controls', 'enabled', true);
          leftEl.setAttribute('visible','true');
          rightEl.setAttribute('visible','true');
          });
          // exit VR
          window.addEventListener('exit-vr', e => {
          cameraEl.removeAttribute('look-controls');
          cameraEl.setAttribute('position', '0 0 0');
          cameraEl.setAttribute('fps-look-controls', 'enabled', true);
          leftEl.setAttribute('visible','false');
          rightEl.setAttribute('visible','false');
          });
        }
        if (isGearVR === true) { // add gear controller
          var leftEl = document.createElement('a-entity');
          leftEl.setAttribute('id','left-hand');
          leftEl.setAttribute('gearvr-controls','left');
          cameraRigEl.appendChild(leftEl);
          var rightEl = document.createElement('a-entity');
          rightEl.setAttribute('id','right-hand');
          rightEl.setAttribute('gearvr-controls','right');
          cameraRigEl.appendChild(rightEl);
        }
    	}
    });
  function voteMsg(message) {
    AFRAME.scenes[0].emit('setVoteVal', {val: message});
  }
  function setDiscussionsByBlog (query, initial) {
    var queryI = { tag: query, limit: 20 }
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
    steem.api.getDiscussionsByTrending(query, (err, result) => {
      if (err === null) {
        var filteredResults = []
        for (i = 0; i < result.length; i++) {
          let vr = JSON.parse(result[i].json_metadata).vrHash
          if (vr) {
            filteredResults.push(result[i])
            }
          }
          setPortals(filteredResults)
          displayContent(result,initial)
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
    function getAccountInfo(username) {
      steem.api.getDynamicGlobalProperties((err, result) => {
        let totalVestingShares = result.total_vesting_shares;
        let totalVestingFundSteem = result.total_vesting_fund_steem;
        steem.api.getAccounts([username], (err, result) => {
          steem.api.getDynamicGlobalProperties((err, result) => {
            let totalVestingShares = result.total_vesting_shares;
            let totalVestingFundSteem = result.total_vesting_fund_steem;
          })
          let user = result[0]
          let jsonData;
          try {jsonData = JSON.parse(user.json_metadata).profile} catch(err) { console.log(err)}
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
            var followerCounter = result.follower_count
            var followingCounter = result.following_count
            console.log(followerCounter)
          })
          let data = {
            name: user.name,
            image: jsonData.profile_image ? 'https://steemitimages.com/512x512/' + jsonData.profile_image : '',
            cover: jsonData.cover_image,
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
            createdDate: new Date (user.created)
          }
          AFRAME.scenes[0].emit('setData', {val: data});
        });
      })
    }
    function generateProfileImage(author){
      let profileImage = 'img/default-user.jpg';
      try {
        if (author.json_metadata === '' || typeof author.json_metadata === 'undefined' ) {
          author.json_metadata = { profile_image : false }
        } else {
          author.json_metadata = JSON.parse(author.json_metadata).profile
        }
        profileImage = author.json_metadata.profile_image ? 'https://steemitimages.com/128x128/' + author.json_metadata.profile_image : '';
      } catch(err){
        console.log(err)
      }
      return profileImage
    }
    function setPortals(action) {
      //if (!action.initial) {action.result.shift()}
      for (let i = 0; i < action.length ; i++) {
        let post = action[i];
        var valP
        var valA
        var val
        valP = Math.round( parseFloat(post.pending_payout_value.substring(0,5)) * 100) / 100
        valA = Math.round( parseFloat(post.total_payout_value.substring(0,5)) * 100) / 100
        if (valP) {
          val = valP
        } else {
          val = valA
        }
      let portal = {
        postId: post.id,
        postUrl: post.url,
        author: post.author,
        title: post.title,
        body: post.body,
        Hash360: JSON.parse(post.json_metadata).Hash360,
        permlink: post.permlink ,
        rep: steem.formatter.reputation(post.author_reputation),
        votesNum: post.net_votes,
        votesVal: '$' + val,
        category: post.category
      }
      AFRAME.scenes[0].emit('addToPortals', {portalObj: portal});
      }
      AFRAME.scenes[0].emit('setPortalsIndex', {val: i});
    }
    AFRAME.registerState({
      initialState: {
        loggedIn: false,
        username: "Acquiring sync",
        name: "Welcome",
        userImage:"https://cdn.glitch.com/5ba0e9a1-e1be-470c-be6c-b6bd1b8e349e%2FOTOLUX%20Tag.png?1528445998829",
        userCover:"",
        userRep: "25",
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
        menuVis: false
      },
      handlers: {
        setLoggedIn: function (state, action) {
          state.loggedIn = action.val;
        },
        setData: function (state, action) {
          state.name = action.val.name
          state.image = action.val.image
          state.cover = action.val.cover
          state.rep = action.val.rep
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
        state.username = action.val;
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
        state.portalIndex = action.val;
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
      }
    }
  });
