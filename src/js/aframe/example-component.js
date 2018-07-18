/* global AFRAME */
/**
 * Example component
 * https://aframe.io/docs/0.8.0/core/component.html#toc
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
const zeroScale = 0.00001

/* eslint no-unused-vars: ["error", { "args": "none" }]*/
AFRAME.registerComponent('example-component', {
  // To enable multiple instancing on your component,
  // set multiple: true in the component definition:
  multiple: false,

  // array 	        Parses comma-separated values to array
  //              (i.e., "1, 2, 3" to ['1', '2', '3']). 	[]
  // asset 	        For URLs pointing to general assets. Can parse URL out of a string
  //              in the form of url(<url>). If the value is an element ID selector
  //              (e.g., #texture), this property type will call getElementById and
  //              getAttribute('src') to return a URL. The asset property type
  //              may or may not change to handle XHRs or return MediaElements directly
  //              (e.g., <img> elements). 	‘’
  // audio 	        Same parsing as the asset property type. Will possibly be used
  //              by the A-Frame Inspector to present audio assets. 	‘’
  // boolean 	      Parses string to boolean (i.e., "false" to false, everything else truthy). 	false
  // color 	        Currently doesn’t do any parsing. Primarily used by the A-Frame
  //              Inspector to present a color picker. Also, it is required to use color
  //              type for color animations to work. 	#FFF
  // int 	          Calls parseInt (e.g., "124.5" to 124). 	0
  // map 	          Same parsing as the asset property type. Will possibly be used
  //              by the A-Frame Inspector to present texture assets. 	‘’
  // model 	        Same parsing as the asset property type. Will possibly be used
  //              by the A-Frame Inspector to present model assets. 	‘’
  // number 	      Calls parseFloat (e.g., "124.5" to 124.5'). 	0
  // selector       Calls querySelector (e.g., "#box" to <a-entity id="box">). 	null
  // selectorAll 	  Calls querySelectorAll and converts NodeList to Array
  //              (e.g., ".boxes" to [<a-entity class=”boxes”, …]), 	null
  // string 	     Doesn’t do any parsing. 	‘’
  // vec2 	       Parses two numbers into an {x, y} object (e.g., 1 -2 to {x: 1, y: -2}. 	{x: 0, y: 0}
  // vec3 	       Parses three numbers into an {x, y, z} object (e.g., 1 -2 3 to {x: 1, y: -2, z: 3}. 	{x: 0, y: 0, z: 0}
  // vec4 	       Parses four numbers into an {x, y, z, w} object (e.g., 1 -2 3 -4.5 to {x: 1, y: -2, z: 3, w: -4.5}. 	{x: 0, y: 0, z: 0, w: 0}
  schema: {
    type: 'vec3',
    default: {
      x: 1,
      y: 1,
      z: 1
    },
    // Custom Property Type
    // Parse slash-delimited string to an array (e.g., `foo="myProperty: a/b"` to `['a', 'b']`).
    myProperty: {
      default: [],
      parse: (value) => value.split('/')
    }
  },
  // Called once when the component is initialized.
  // Used to set up initial state and instantiate variables.
  init() {},

  // Called both when the component is initialized and whenever the component’s
  // data changes (e.g, via setAttribute). Used to modify the entity.
  update(oldData) {

    const data = this.data
    const object3D = this.el.object3D
    const x = data.x === 0 ? zeroScale : data.x
    const y = data.y === 0 ? zeroScale : data.y
    const z = data.z === 0 ? zeroScale : data.z

    object3D.scale.set(x, y, z)
  },

  // Called when the component detaches from the element (e.g.,
  // via removeAttribute). Used to undo all previous modifications to the entity.
  remove() {},

  // Called on each render loop or tick of the scene. Used for continuous changes.
  tick(time, timeDelta) {},

  // Identical to the tick method but invoked after the scene has rendered.
  tock(time, timeDelta) {},

  // Called whenever the scene or entity plays to add
  // any background or dynamic behavior. Used to start or resume behavior.
  play() {},

  // Called whenever the scene or entity pauses to remove any
  // background or dynamic behavior. Used to pause behavior.
  pause() {},

  // Called on every update. Can be used to dynamically modify the schema.
  updateSchema() {}
})
