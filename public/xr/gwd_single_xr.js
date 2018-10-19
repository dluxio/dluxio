window.gwd = window.gwd || {};
    gwd.toggleUserMenu = function(event) {
      var x = document.getElementById("userMenu");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    };
    gwd.toggleBlogPost = function(event) {
      var x = document.getElementById("blogPost");
      var y = document.getElementById("userMenu");
      var z = document.getElementById("authorCard");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
      if (y.style.visibility === "visible") {
        y.style.visibility = "hidden";
      }
      if (z.style.visibility === "visible") {
        z.style.visibility = "hidden";
      }
    };
    gwd.hideUserMenu = function(event) {
      var x = document.getElementById("userMenu");
      if (x.style.visibility === "visible") {
        x.style.visibility = "hidden";
      }
    };
    gwd.shareBtn = function(event) {
      alert("Post a photo to social media");
    };
    gwd.likeBtn = function(event) {
      vote(10000)
    };
    gwd.followBtn = function(event) {
      follow(author)
    };
    gwd.toggleAuthorCard = function(event) {
      var x = document.getElementById("authorCard");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    };
    gwd.resteem = function(event) {
      if(confirm("You are about to resteem this post, this can't be undone.")){
      var x = document.getElementById("resteem-oval");
      x.style.backgroundColor = "#008bfd";
    }
    };
    gwd.pay = function(event) {
      var spDel = parseInt(prompt(`Amount of STEEM to send to ${author}`)).toFixed(3)
      var link = `https://steemconnect.com/sign/transfer?from=${iAm}&to=${author}&amount=${spDel}&memo=Via%20dlux&uri=${location.href}`
    };
    gwd.mute = function(event) {
      alert("You muted robotolux");
    };
    gwd.follow = function(event) {
      follow(author)
    };
    gwd.togglePostHeader = function(event) {
      var x = document.getElementById("postHeader");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    };
    gwd.xrTap = function(event) {
      var u = document.getElementById("info-taparea");
      var v = document.getElementById("xr-taparea");
      var w = document.getElementById("info-selectionbox");
      var x = document.getElementById("xr-selectionbox");
      var y = document.getElementById("info-txt");
      var z = document.getElementById("xr-txt");
      var a = document.getElementById("info");
      var b = document.getElementById("shutter-btn");
      u.style.visibility = "visible";
      v.style.visibility = "hidden";
      w.style.visibility = "hidden";
      x.style.visibility = "visible";
      z.style.color = "#008bfd";
      z.style.fontWeight = "bold";
      y.style.fontWeight = "normal";
      y.style.color = "#323233";
      a.style.visibility = "hidden";
      b.style.visibility = "hidden";
    };
    gwd.infoTap = function(event) {
      var u = document.getElementById("info-taparea");
      var v = document.getElementById("xr-taparea");
      var w = document.getElementById("info-selectionbox");
      var x = document.getElementById("xr-selectionbox");
      var y = document.getElementById("info-txt");
      var z = document.getElementById("xr-txt");
      var a = document.getElementById("info");
      var b = document.getElementById("shutter-btn");
      u.style.visibility = "hidden";
      v.style.visibility = "visible";
      w.style.visibility = "visible";
      x.style.visibility = "hidden";
      z.style.color = "#323233";
      y.style.color = "#008bfd";
      y.style.fontWeight = "bold";
      z.style.fontWeight = "normal";
      a.style.visibility = "visible";
      b.style.visibility = "hidden";
    };
    gwd.authorPicTap = function(event) {
      var x = document.getElementById("author-btns");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    };
    gwd.toggleMenu = function(event) {
      //if (iAm == 'Guest') {sendLink('/auth')}
      var x = document.getElementById("side-menu");
      if (x.style.visibility === "visible") {
        x.style.visibility = "hidden";
      } else {
        x.style.visibility = "visible";
      }
    };
    gwd.toggleAuthor = function(event) {
      var x = document.getElementById("author-header");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
      }
    };
    gwd.upVote = function(event) {
      vote(10000)
      var x = document.getElementById("upvote-oval");
      x.style.backgroundColor = "#008bfd";
    };
    gwd.delegateTap = function(event) {
      var spDel = parseInt(prompt(`Amount of SP to delegate to ${author}`)).toFixed(3)
      sendLink(`https://steemconnect.com/sign/delegateVestingShares?delegatee=${author}&vesting_shares=${spDel}%20SP`)    };
    gwd.shutterBtn = function(event) {
      alert("Photo saved to camera roll");
    };
    gwd.homeTap = function(event) {
      sendLink(`/@${iAm}`)
    };
    gwd.sendSteemTap = function(event) {
      var spDel = parseInt(prompt(`Amount of STEEM to send to ${author}`)).toFixed(3)
      var link = `https://steemconnect.com/sign/transfer?from=${iAm}&to=${author}&amount=${spDel}&memo=Via%20dlux&uri=${location.href}`
    };
    gwd.aboutTap = function(event) {
      sendLink('/about')
    };
    gwd.logoutTap = function(event) {
      if (iAm == 'Guest') {
        sendLink('/auth')
      } else {
      sendLink('/auth/logout')
    }
    };
    gwd.userProfileTap = function(event) {
      if (iAm == 'Guest') {
      sendLink('/auth')
      } else {
      sendLink(`/@${iAm}`)
    }
    };
    gwd.closeTap = function(event) {
      sendLink('/2d/@robotolux')
    };
