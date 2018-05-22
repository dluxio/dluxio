/* add URL and click event to objects */
AFRAME.registerComponent('url', {
  schema: {default: ''},

  init: function () {

    var url = this.data;

    this.el.addEventListener('click', function () {
    window.location.href = url;
    });

    this.el.addEventListener('mouseenter', function () {
    el.setAttribute('color:red');
    });
}
});
/* toggle the Author Info */
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
