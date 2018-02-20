/* global AFRAME */
/**
 * Example component
 * https://aframe.io/docs/0.4.0/core/component.html#toc
 *
 * Under the Hood
 *
 * Properties
 *
 * attrName       Full HTML attribute name used to define the component. Used if component can have multiple instances.
 * data           Parsed data object of the component derived from the schema default values, mixins, and the entity’s attributes.
 * dependencies   Components to initialize first and wait for.
 * el             Reference to the entity element.
 * id             ID or name of the individual instance of the component. Used if component can have multiple instances.
 * multible       Whether component can have multiple instances by suffixing __<id> to the HTML attribute name of the component.
 * name           Base name used to register the component.
 * schema         Component property names, types, default values, parsers, and stringifiers.
 *
 * A single-property schema might look like:
 *  schema: {
 *    type: 'int', default: 5
 *  }
 * A multi-property schema might look like:
 *  schema: {
 *  color: { default: '#FFF' },
 *  target: { type: 'selector' },
 *  uv: {
 *    default: '1 1',
 *    parse: function (value) {
 *      return value.split(' ').map(parseFloat);
 *    }
 *  },
 * }
 *
 */
var zeroScale = 0.00001

AFRAME.registerComponent('example-scale', {
  // To enable multiple instancing on your component,
  // set multiple: true in the component definition:
  multiple: false,

  schema: {
    type: 'vec3',
    default: {x: 1, y: 1, z: 1}
  },
  // Called once when the component is initialized.
  // Used to set up initial state and instantiate variables.
  init () {},

  // Called both when the component is initialized and whenever the component’s
  // data changes (e.g, via setAttribute). Used to modify the entity.
  update () {
    var data = this.data
    var object3D = this.el.object3D
    var x = data.x === 0 ? zeroScale : data.x
    var y = data.y === 0 ? zeroScale : data.y
    var z = data.z === 0 ? zeroScale : data.z
    object3D.scale.set(x, y, z)
  },

  // Called when the component detaches from the element (e.g.,
  // via removeAttribute). Used to undo all previous modifications to the entity.
  remove () {},

  // Called on each render loop or tick of the scene. Used for continuous changes.
  tick () {},

  // Called whenever the scene or entity plays to add
  // any background or dynamic behavior. Used to start or resume behavior.
  play () {},

  // Called whenever the scene or entity pauses to remove any
  // background or dynamic behavior. Used to pause behavior.
  pause () {},

  // Called on every update. Can be used to dynamically modify the schema.
  updateSchema () {}
})
