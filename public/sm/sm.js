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
        var cameraRigEl = document.querySelector('#cameraRig');
        let cameraEl = this.el;
        cameraEl.setAttribute('id','head');
        var cursorEl = document.createElement('a-cursor');
        cursorEl.setAttribute('position', '0 0 -1');

        cursorEl.setAttribute('color','#4CC3D9');

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
            cursorEl.setAttribute('color','#4CC3D9');
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
            cursorEl.setAttribute('color','#4CC3D9');
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
    var queryI = { tag: 'dlux', limit: 20 }
    if(query) {queryI = { tag: query, limit: 20 }}
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
    var queryI = { tag: 'dlux', limit: 20 }
    if(query) {queryI = { tag: query, limit: 20 }}
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
    var queryI = { tag: 'dlux', limit: 20 }
    if(query) {queryI = { tag: query, limit: 20 }}
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
        console.log(authorData)
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
          console.log(data)
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
        console.log(val)
      let portal = {
        postId: post.id,
        postUrl: post.url,
        author: post.author,
        authorImage: authorData.profile_image,
        title: post.title,
        body: post.body,
        Hash360: JSON.parse(post.json_metadata).Hash360,
        permlink: post.permlink ,
        rep: steem.formatter.reputation(post.author_reputation),
        votesNum: post.net_votes,
        votesVal: '$' + val,
        category: post.category
      }
      console.log(portal)
      AFRAME.scenes[0].emit('addToPortals', {portalObj: portal});
      });
      }
      AFRAME.scenes[0].emit('setPortalsIndex', {val: i});
    }

AFRAME.registerState({
initialState: {
  cards: [],
  settings: {},
  Player: null,
  collection_filters: {
    show_all: false,
    gold: false,
    color: 'All',
    rarity: 'All',
    type: 'All'
  },
  _activeDialog: null,
  _loading: null,
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
  menuVis: false
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
    console.log(state)
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
},
delPortals: function (state, action) {
  state.portals = [];
},
Api: function (url, data, callback) {
    if (data == null || data == undefined)
      data = {};

    // Add a dummy timestamp parameter to prevent IE from caching the requests.
    data.v = new Date().getTime();

    if(state.Player) {
      data.token = state.Player.token;
      data.username = state.Player.name;
    }

    jQuery.getJSON('https://steemmonsters.com' + url, data, function (response) {
      if (callback != null && callback != undefined)
        callback(response);
    });
  },

  ShowHomeView: function (view, data) {
    if(Config.maintenance_mode && (!state.Player || !state.Player.is_admin))
      view = 'maintenance';

    $('#page_container').html(render(view, { data: data }));
  },

  ShowView: function (view, url, data, callback) {
    if (url == null || url == undefined)
      $('#view_container').html(render(view, { data: data }));
    else {
      $('#view_container').html('<img src="/images/loading.gif" style="height: 75px; margin-top: 100px;" />');

      state.Api(url, data, function (response) {
        $('#view_container').html(render(view, { data: response }));

        if (callback != null && callback != undefined)
          callback(response);
      });
    }

    // Save this view so we can go back to it later.
    state.LastView = WordChase.CurrentView;
    state.CurrentView = { view: view, url: url, data: data };
  },

  ShowDialog: function (dialog, data, url, onClose, no_backdrop) {
    if (state._activeDialog != null && state._activeDialog.hasClass('in')) {
      $('.modal-backdrop').remove();
      state.HideDialog();
    }

    if (url == null || url == undefined) {
        state.RenderDialog(dialog, data, function () { state.OnDialogHidden(onClose); }, no_backdrop);
    } else {
        state.Api(url, data, function (response) {
            state.RenderDialog(dialog, response, function () { state.OnDialogHidden(onClose); }, no_backdrop);
        });
    }
  },

  OnDialogHidden: function (callback) {
      if (state._activeDialog == null || !state._activeDialog.hasClass('in')) {
          state._activeDialog = null;
      }

      if (callback) {
        callback();
      }

      $('.modal-backdrop').remove();
  },
  ShowLoading: function() {
    state._loading = $('<div class="modal-backdrop fade in loading-backdrop" />');
    state._loading.append($('<img src="/images/loading.gif" class="loading" />'));
    state._loading.appendTo('body');
  },

  HideLoading: function() {
    state._loading.remove();
  },

  RenderDialog: function (dialog, data, onClose, no_backdrop) {
      $('#dialog_container').html(render('dialogs/' + dialog, { data: data }));
      state._activeDialog = $('#dialog_container').children('.modal');
      state._activeDialog.modal({ backdrop: !no_backdrop });
      state._activeDialog.modal('show');

      if (onClose)
          state._activeDialog.on('hidden.bs.modal', onClose);
  },

  HideDialog: function (cancelEvents, onHidden) {
    if (!state._activeDialog) {
        if (onHidden) {
            onHidden();
        }

        return;
    }

    if (cancelEvents)
       state._activeDialog.off('hidden.bs.modal');

    if(onHidden) {
      state._activeDialog.on('hidden.bs.modal', function () { state.OnDialogHidden(onHidden); });
    }

    state._activeDialog.modal('hide');
  },

  HighlightMenuItem: function(item) {
    $('#menu_list li').removeClass('active');
    $('#menu_item_' + item).addClass('active');
  },

  ShowComponent: function (component, data) {
    return render('/components/' + component, { data: data });
  },

  ShowLogin: function(callback) {
    if(state.Player) {
      state.ShowPacks();
    } else
      state.ShowDialog('login', null, null, callback);
  },

  Logout: function() {
    localStorage.removeItem('username');
    localStorage.removeItem('key');
    state.Player = null;
    state.Login();
    state.ShowAbout();
  },

  Login: function(username, key, fromDialog) {
    if(fromDialog && key && key.startsWith('STM')) {
      // This is a public key, not a private key
      $('#btn_login').show();
      $('#login_loading').hide();
      $('#login_error').text('This appears to be a public key. You must use your private posting key to log in.');
      $('#login_error').show();
      return;
    }

    // Check if this is a master password, if so try to generate the private key
    if(key && !steem.auth.isWif(key)) {
      key = steem.auth.getPrivateKeys(username, key, ['posting']).posting;
    }

    if(!username)
      var username = localStorage.getItem('username');

    if(!key)
      var key = wif;

    if(!username || !key) {
      $('#log_in_button').show();
      $('#log_in_text').hide();
    } else {
      if(fromDialog) {
        $('#btn_login').hide();
        $('#login_loading').show();
      }

      var pub_key = null;

      try {
        pub_key = steem.auth.wifToPublic(key);
      } catch (err) {
        if(fromDialog) {
          $('#btn_login').show();
          $('#login_loading').hide();
          $('#login_error').text('Invalid password or private posting key for account @' + username);
          $('#login_error').show();
          return;
        }
      }

      if(username.startsWith('@'))
        username = username.substr(1);

      state.Api('/players/login', { name: username.toLowerCase(), pub_key: pub_key }, function(response) {
        if(response.error) {
          // Show error message of account not found
          if(fromDialog) {
            $('#btn_login').show();
            $('#login_loading').hide();
            $('#login_error').text(response.error);
            $('#login_error').show();
          } else {
            $('#log_in_button').show();
            $('#log_in_text').hide();
          }

          return;
        }

        var token = null;
        try {
          token = window.decodeMemo(key, response.token).substr(1);

          localStorage.setItem('username', username);
          localStorage.setItem('key', key);

          state.Player = { name: response.name, token: token, starter_pack_purchase: response.starter_pack_purchase, is_admin: response.is_admin };

          $('#log_in_button').hide();
          $('#log_in_text').show();
          $('#log_in_text .username').text(state.Player.name);

          if(response.is_admin)
            $('#nav_admin').show();
          else
            $('#nav_admin').hide();

          if(fromDialog) {
            state.HideDialog();
          }

          if(!Config.maintenance_mode) {
            if(!state.ShowAnnouncement())
              state.LoadGifts();
          }
        } catch(err) {
          if(fromDialog) {
            $('#btn_login').show();
            $('#login_loading').hide();
            $('#login_error').text('Invalid password or private posting key for account @' + username);
            $('#login_error').show();
          } else {
            $('#log_in_button').show();
            $('#log_in_text').hide();
          }
        }
      });
    }
  },

  ShowAnnouncement: function() {
		return false;
		/*
    if(!localStorage.getItem('announcement_gold_cards')) {
      localStorage.setItem('announcement_gold_cards', true);
      state.ShowDialog('messages/gold_cards');
      return true;
    } else
			return false;
		*/
  },

  ShowAdmin: function() {
    state.ShowHomeView('admin');
  },

  ShowAbout: function() {
    state.HighlightMenuItem('about');
    state.ShowHomeView('about');
  },

  ShowMarket: function () {
    state.HighlightMenuItem('market');

    state.Api('/market/for_sale', null, function (response) {
      //Group cards together
      var groups = _.groupBy(response, function(c){return c.card_detail_id+'#'+c.gold})

      //Format data
      var formattedData = _.map(groups, function(group){
        var card = state.GetCardDetails(group[0].card_detail_id);
        return {
          card_detail_id: group[0].card_detail_id,
          rarity: card.rarity,
          color: card.color,
          name: card.name,
          type: card.type,
          gold: group[0].gold,
          qty: group.length,
          low_price: group.reduce(function (acc, cur) { return Math.min(acc, cur.buy_price) }, Number.MAX_VALUE),
          high_price: group.reduce(function (acc, cur) { return Math.max(acc, cur.buy_price) }, Number.MIN_VALUE)
        }
      }).sort((a, b) => a.card_detail_id - b.card_detail_id);

      var data = { listData : response, groupedData : formattedData };

      state.ShowHomeView('market', data);
    });
  },

  ShowTournament: function () {
    state.HighlightMenuItem('tournament');
    state.ShowHomeView('tournament');
  },

  ShowPacks: function(source) {
    state.HighlightMenuItem('packs');

    if(state.Player) {
      state.Api('/cards/packs/' + state.Player.name, null, function (response) {
				state.LoadSettings(function() {
					state.ShowHomeView('packs', response);
				});
      });
    } else {
      state.ShowHomeView('packs', { packs: [], starter_pack_purchase: false });
    }
  },

  ShowCollection: function (playerNameOverride, callback) {
    state.HighlightMenuItem('collection');

    if(state.Player || playerNameOverride) {
      var accountName = (playerNameOverride) ? playerNameOverride : state.Player.name;

      state.Api('/cards/collection/' + accountName, null, function (response) {
        var collection = state.cards;
        collection.forEach(c => c.owned = []);

        for(var i = 0; i < response.cards.length; i++) {
          var card = response.cards[i];
          var collection_card = collection.find(c => c.id == card.card_detail_id);

          if(collection_card) {
            collection_card.owned.push(card);
          }
        }

        collection.forEach(c => c.owned = c.owned.sort((a, b) => b.xp - a.xp));
				state.ShowHomeView('collection', Object.assign(collection, { "player": playerNameOverride ? playerNameOverride : state.Player.name }));

				if(callback)
					callback();
      });
    } else {
      state.cards.forEach(c => c.owned = []);
      state.ShowHomeView('collection', state.cards);
    }
  },

  LoadCards: function () {
    state.Api('/cards/get_details', null, function (response) {
      state.cards = response;
    });
  },

  GetCardDetails: function (id) {
    return state.cards.find((card) => { return card.id == id; });
  },

  GetCardLevelInfo: function (card) {
    var details = state.GetCardDetails(card.card_detail_id);
    var levels = Config.xp_levels[details.rarity - 1];
    var level = 0;

    for(var i = 0; i < levels.length; i++) {
      if(card.xp < levels[i]) {
        level = i + 1;
        break;
      }
    }

    if(level == 0)
      level = levels.length + 1;

    return {
      level: level,
      xp_to_next_level: (level > levels.length) ? card.xp - levels[levels.length - 1] : (card.xp - ((level == 1) ? 0 : levels[level - 2])),
      xp_needed: (level > levels.length) ? -1 : ((level == 1) ? levels[level - 1] : levels[level - 1] - levels[level - 2])
    }
  },

  ShowCardDetails: function(detail_id, gold) {
    var card = state.GetCardDetails(detail_id);

    state.ShowDialog('card_details', Object.assign({ gold: gold }, card));
  },

  ShowMarketCardDetails: function(detail_id, gold) {
    var card = state.GetCardDetails(detail_id);

    state.Api('/market/for_sale', null, function (response) {
      var listData = response.filter(r => r.card_detail_id == detail_id && r.gold == gold);

      var data = { listData : listData.sort((a, b) => a.buy_price - b.buy_price),
                    card : card, gold: gold };

      state.ShowDialog('market_details', data);
    });
  },

  StartPurchase: function (type, quantity, currency, sendTo, callback) {
    if(isNaN(quantity) || quantity <= 0)
      return;

    var name = state.Player ? state.Player.name : '';

    if(currency == 'STEEM' || currency == 'SBD') {
      if(sendTo) {
        if(confirm('Please confirm that you want to purchase ' + quantity + ' booster packs for @' + sendTo + '.')) {
          state.Api('/purchases/start', { player: sendTo, type: type, qty: quantity, currency: currency, merchant: 'dlux-io' }, callback);
          //state.ShowDialog('payment', { player: sendTo, type: type, qty: quantity, currency: currency }, '/purchases/start');
        }
      } else
        state.Api('/purchases/start', { player: name, type: type, qty: quantity, currency: currency, merchant: 'dlux-io' }, callback);
        //state.ShowDialog('payment', { player: state.Player.name, type: type, qty: quantity, currency: currency }, '/purchases/start');
    } else {
      state.ShowLoading();

      state.Api('/purchases/start', { player: name, type: type, qty: quantity, currency: 'STEEM', merchant: 'dlux-io' }, function(response) {
        if(!response.error) {
          var steem = parseFloat(response.payment);

          $.get('https://blocktrades.us/api/v2/estimate-input-amount?outputAmount=' + steem.toFixed(3) + '&inputCoinType=' + currency.toLowerCase() + '&outputCoinType=steem', function(data) {
            if(!data.error) {
              $.post('https://blocktrades.us/api/v2/simple-api/initiate-trade',
                { "inputCoinType": currency.toLowerCase(),
                  "outputCoinType": "steem",
                  "outputAddress": "steemmonsters",
                  "outputMemo": response.uid
                }, function(trade) {
                  if(!trade.error) {
                    state.HideLoading();

                    if(callback)
                      callback(Object.assign({ trade: trade, inputAmount: data.inputAmount }, response));

                    //state.ShowDialog('payment', Object.assign({ trade: trade, inputAmount: data.inputAmount }, response));
                  } else {
                    state.HideLoading();
                    alert(JSON.stringify(trade.error));
                  }
                });
            } else {
              state.HideLoading();
              alert(JSON.stringify(data.error));
            }
          });
        } else {
          state.HideLoading();
          alert(response.error);
        }
      });
    }
  },

  OpenPack: function (packs) {
    if(packs.lenth <= 0)
    {
      console.log("No packs to open");
      return;
    }

    var first_pack = packs.shift();

    state.Api('/cards/open_pack/' + first_pack.uid, { player: state.Player.name }, function(response) {
      state.ShowDialog('open_pack', Object.assign({}, response, { packs : packs } ), null, null, true);
    });
  },

  OpenAllPacks: function () {
    state.Api('/cards/open_all_packs/' + state.Player.name, { player: state.Player.name }, function(response) {
      //Group cards together
      var groups = _.groupBy(response.cards, function(c){return c.card_detail_id+'#'+c.gold})
      //Format data
      var data = _.map(groups, function(group){
        return {
          card_detail_id: group[0].card_detail_id,
          rarity: state.GetCardDetails(group[0].card_detail_id).rarity,
          gold: group[0].gold,
          qty: group.length
        }
      });

      data.sort((a, b) => ((b.gold ? 5 : 0) + b.rarity) - ((a.gold ? 5 : 0) + a.rarity));
      state.ShowDialog('open_all_packs', data, null, null, true);

    });
  },

	SubmitPayment: function(payment_method, amount, currency, purchase_id) {
    state.ShowDialog('process_payment', { currency: currency });
    sc2_pay.setOptions({ check_transfer: false });

		if(payment_method == 'vessel') {
      sc2_pay.requestPaymentVessel('Purchase Card Packs!', state.Player.name, amount, currency, purchase_id);
      state.StartStatusCheck(purchase_id, 5);
		} else if(payment_method == 'steemconnect') {
      sc2_pay.requestPayment('Purchase Card Packs!', state.Player.name, amount, currency, purchase_id);
      state.StartStatusCheck(purchase_id, 5);
		} else {
      state.StartStatusCheck(purchase_id, 30);
    }
  },

  StartStatusCheck: function(purchase_id, interval) {
    state.CheckPurchaseStatus(purchase_id, interval, 0, function(response) {
      if(response.type == 'starter_pack')
        state.HideDialog(true, function() {
          if(!state.Player)
            state.Login(response.player);

          state.ShowPacks();
          setTimeout(function() { state.ShowDialog('welcome'); }, 1000);
        });
      else
        state.HideDialog(true, function() { state.ShowPacks(); });
    });
  },

  CheckPurchaseStatus: function(purchase_id, interval, retries, callback) {
    console.log('Checking purchase status: ' + purchase_id);

		var url = purchase_id.startsWith('P-') ? '/purchases/status' : '/market/status';

    state.Api(url, { id: purchase_id }, function(response) {
      if(response && response.status) {
        sc2_pay.close();

        if(callback)
          callback(response);
      } else if(retries < 40)
        setTimeout(function() { state.CheckPurchaseStatus(purchase_id, interval, retries + 1, callback) }, interval * 1000);
    });
  },

	LoadSettings: function(callback) {
		state.Api('/purchases/settings', null, function(response) {
      state.settings = response;

			if(callback)
				callback();
		});
  },

  GiftPacks: function(to, qty, callback) {
    var obj = { to: to, qty: qty };
    $.post({
    url: '/post/custom/',
    dataType: 'json',
    data: {
    'requiredAuths': [],
    'requiredPostingAuths': [state.Player.name],
    'id': 'sm_gift_packs',
    'json': JSON.stringify(obj)
    }
    }, (response) => {
      if(response && !response.err) {
        state.Api('/cards/gift_packs', { trx_id: response.id, to: to.toLowerCase(), qty: qty }, callback);
      } else if(callback) {
          callback({ error: 'There was an error publishing this transaction to the Steem blockchain. Please try again in a few minutes.' });
      }
    });
  },

  CombineCards: function(card_detail_id, card_ids, callback) {
    var obj = { cards: card_ids };
    var details = state.GetCardDetails(card_detail_id);
    $.post({
    url: '/post/custom/',
    dataType: 'json',
    data: {
    'requiredAuths': [],
    'requiredPostingAuths': [state.Player.name],
    'id': 'sm_combine_cards',
    'json': JSON.stringify(obj)
    }
    }, (response) => {
      if(response && !response.err) {
    setTimeout(function() { state.TrxLookup(response.msg.id, details, callback, 10); }, 1000);
    } else {
      // Show error message
      alert('There was an error publishing this transaction to the Steem blockchain. Please try again in a few minutes.');
      console.log(response.err);

      if(callback)
        callback(details);
    }
    })
    },

  GiftCards: function(card_detail_id, to, card_ids, callback) {
    var obj = { to: to, cards: card_ids };
    var details = state.GetCardDetails(card_detail_id);
    $.post({
    url: '/post/custom/',
    dataType: 'json',
    data: {
    'requiredAuths': [],
    'requiredPostingAuths': [state.Player.name],
    'id': 'sm_gift_cards',
    'json': JSON.stringify(obj)
    }
    }, (response) => {
      if(response && !response.err) {
        setTimeout(function() { state.TrxLookup(response.id, details, callback, 10); }, 1000);
      } else if(callback) {
        alert('There was an error publishing this transaction to the Steem blockchain. Please try again in a few minutes.');
        console.log(response.err);

        if(callback)
          callback(details);
      }
    });
  },

  TrxLookup: function(trx_id, details, callback, retries) {
		var card_detail_id = details ? details.id : null;
    state.Api('/cards/trx_lookup', { trx_id: trx_id, card_detail_id: card_detail_id }, function(response) {
      if(!response.error) {
				if(details)
        	details.owned = response.cards.sort((a, b) => b.xp - a.xp);

        if(callback)
          callback(details ? details : response);
      } else if(!response.trx_info && retries > 0)
        setTimeout(function() { state.TrxLookup(trx_id, details, callback, retries - 1); }, 3000);
      else {
				if(!response.trx_info)
					alert('It looks like the Steem Monsters node is behind on blocks! Please reload the page in a few minutes to see if the transaction has gone through.');
				else
					alert('There was an error completing this transaction: ' + response.error);

        if(callback)
          callback(details ? details : response);
      }
    });
  },

  LoadGifts: function() {
    state.Api('/players/gifts', null, function(response) {
      if(response && response.length > 0) {
        var packs = [];
        var cards = [];

        for(var i = 0; i < response.length; i++) {
          var gift = response[i];

          if(gift.card_detail_id) {
            cards.push({ type: 'card', from: gift.from_player, uid: gift.uid, card_detail_id: gift.card_detail_id, xp: gift.xp, gold: gift.gold });
          } else {
            var pack = packs.find(p => p.from == gift.from_player);

            if(pack)
              pack.qty++;
            else
              packs.push({ type: 'pack', from: gift.from_player, qty: 1 });
          }
        }

        state.ShowDialog('gifts', packs.concat(cards));

        state.Api('/players/accept_gifts');
      }
    });
  },

  CheckAccount(name, ok, bad, callback) {
    steem.api.getAccounts([name], function(err, result) {
      if(result && result.length > 0 && result[0].name) {
        if(ok)
          ok.show();

        if(bad)
          bad.hide();

        if(callback)
          callback(true);
      } else {
        if(ok)
          ok.hide();

        if(bad)
          bad.show();

        if(callback)
          callback(false);
      }
    });
  },

  SellCards: function(card_ids, price, callback) {
    var obj = { cards: card_ids, currency: 'USD', price: price, fee_pct: state.settings.market_fee };
    $.post({
    url: '/post/custom/',
    dataType: 'json',
    data: {
    'requiredAuths': [],
    'requiredPostingAuths': [state.Player.name],
    'id': 'sm_sell_cards',
    'json': JSON.stringify(obj)
    }
    }, (response) => {
			if(response && !response.err) {
        setTimeout(function() { state.TrxLookup(response.id, null, callback, 10); }, 1000);
      } else if(callback) {
        alert('There was an error publishing this transaction to the Steem blockchain. Please try again in a few minutes.');
        console.log(response.err);

        if(callback)
          callback();
			}
    });
  },

  CancelSellCards: function(market_id, callback) {
    var obj = { trx_id: market_id };
    $.post({
    url: '/post/custom/',
    dataType: 'json',
    data: {
    'requiredAuths': [],
    'requiredPostingAuths': [state.Player.name],
    'id': 'sm_cancel_sell',
    'json': JSON.stringify(obj)
    }
    }, (response) => {
			if(response && !response.err) {
        setTimeout(function() { state.TrxLookup(response.id, null, callback, 10); }, 1000);
      } else if(callback) {
        alert('There was an error publishing this transaction to the Steem blockchain. Please try again in a few minutes.');
        console.log(response.err);

        if(callback)
          callback();
			}
    });
  },

  BuyCard: function(market_id, payment, callback) {
    var obj = { market_id: market_id };//https://steemmonsters.com/purchases/start?player=yabapmatt&type=booster_pack&qty=10&currency=STEEM&merchant=dlux
    $.post({
    url: '/post/custom/',
    dataType: 'json',
    data: {
    'requiredAuths': [],
    'requiredPostingAuths': [state.Player.name],
    'id': 'sm_market_buy',
    'json': JSON.stringify(obj)
    }
  }, (result) => {
      if(result && !result.err) {
        state.Api('/market/purchase', { market_id: market_id, payment: payment, trx_id: response.id }, function(response) {
          if(!response.error)
          {
            console.log(response);
          }
          else
            alert('There was an error completing this transaction: ' + response.error);

          if(callback)
            callback(response);
        });
      } else if(callback) {
        alert('There was an error publishing this transaction to the Steem blockchain. Please try again in a few minutes.');
        console.log(err);

        if(callback)
          callback(response);
      }
    });
  },

  CardDetailString: function(card) {
    var rarity = card.rarity == 4 ? 'Legendary' : card.rarity == 3 ? 'Epic' : card.rarity == 2 ? 'Rare' : 'Common';
    var splinter = card.color == 'Red' ? 'Fire' : card.color == 'Blue' ? 'Water' : card.color == 'Green' ? 'Earth' : card.color == 'Black' ? 'Death' : card.color == 'White' ? 'Life' : 'Dragon';
    return 'Type: ' + card.type + '  |  Splinter: ' + splinter + '  |  Rarity: ' + rarity;
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
