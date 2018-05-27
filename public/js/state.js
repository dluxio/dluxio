function steemState(message) {
  AFRAME.scenes[0].emit('setID', {val: message.content[postKey].id});
  AFRAME.scenes[0].emit('setTitle', {val: message.content[postKey].root_title});
  AFRAME.scenes[0].emit('setAuthor', {val: message.content[postKey].author});
  AFRAME.scenes[0].emit('setVotesNum', {val: message.content[postKey].net_votes});
  AFRAME.scenes[0].emit('setVotesVal', {val: Math.round( parseFloat(message.content[postKey].pending_payout_value.substring(0,5)) * 100) / 100});
  AFRAME.scenes[0].emit('setID', {val: message.content[postKey].id});
  AFRAME.registerState({
    initialState: {
      loggedIn: false,
      username: "Acquiring sync",
      userImage:"",
      userRep: "",
      portals: [],
      portalIndex: 0,
      portalCat: "",
      portalSub: "dlux-io",
      votePower: "%",
      voteValue: "$",
      voteCurrentWeight: "100%",
      menuVis: false,

      author: {},
      title: "",
      Hash360: "",
      permlink: "",
      rep: "UND",
      profileimage: "",
      votesNum: "UNK",
      votesVal: "$0",
      voteMsg: "Vote!",
      category: "",
      tags: {},
      reblogs: 0,

    },

    handlers: {
      setLoggedIn: function (state, action) {
        state.loggedIn = action.val;
      },
      setUsername: function (state, action) {
        state.username = action.val;
      },
      setUserImage: function (state, action) {
        state.userImage = action.val;
      },
      setUserRep: function (state, action) {
        state.userRep = action.val;
      },
      funwithportals: function (state, action) {
        state.portals = action things
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
        state.portals.push(action.newPortal);
      },
      /*
      setTrendingTags: function {
      steem.api.getTrendingTags('', 20, (err, result) => {
        if (err) return console.log(err);
        result = result.filter(post => post.parent_permlink === 'dlux')
        displayTrendingTags(result)
      });
      },
      */
      setDiscussionsByBlog: function (state, action) {
        let query = { tag: action.blogOf, limit: 20 }
        steem.api.getDiscussionsByBlog(query, (err, result) => {
          var filteredResults = []
          for (i = 0; i < result.length; i++) {
            let vr = JSON.parse(result[i].json_metadata).vrHash
            if (vr) {
              filteredResults.push(result[i])
            }
          }
         setPortals(state, {filteredResults, 1})
       })
     },
     setPortals: function (state, action) {
       function displayContent(result, initial){
         if (!action.initial) action.result.shift()
         for (let i = 0; i < action.result.length ; i++) {
             let post = action.result[i];
             let portal = {
               postId: post.id,
               postUrl: post.url,
               author: post.author,
               title: post.title,
               Hash360: post.json_meta.Hash360,
               permlink: post.permlink ,
               rep: post.author_reputation,
               votesNum: post.net_votes,
               votesVal: Math.round( parseFloat(post.pending_payout_value.substring(0,5)) * 100) / 100,
               category: post.category
              }
            let payload = {ind: i, newPortal: portal}
            addToPortals(state, payload)
         }
       }

     }
    }
  })
