// A-Frame
const AFRAME = window.AFRAME;
AFRAME.registerSystem('custom-system', {
  init () {
    this.entities = [];
  },
  registerMe (el) {
    this.entities.push(el);
  },
  unregisterMe (el) {
    var index = this.entities.indexOf(el);
    this.entities.splice(index, 1);
  }
});
