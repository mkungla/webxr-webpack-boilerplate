// A-Frame
const AFRAME = window.AFRAME;
AFRAME.registerSystem('custom-system', {
  init: function () {
    this.entities = [];
  },
  registerMe: function (el) {
    this.entities.push(el);
  },
  unregisterMe: function (el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  }
});
