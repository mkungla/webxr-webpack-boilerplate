const chalk = require('chalk');

const parseArguments = array => {
  const getKey = arg => String(arg).trim().startsWith('-') ? arg.trim().replace(/^[-]+/, '') : false;
  return array.reduce((previous, current, index, args_array) => {
    const key = getKey(current);
    if(key) {
      let argVal = true;
      if (index < args_array.length - 1) {
        const n = String(args_array[index + 1]).trim();
        if (!n.startsWith('-')) {
          argVal = args_array[index + 1];
          args_array.splice(index, 1);
        }
      }
      return {
       ...previous,
       [key]: argVal
      }
      //return {previous, [key]: argVal}
    }
    return previous;
  }, {});
};
exports.parseArguments = parseArguments;

const sanitizeObject = object => {
  const clean = {};
  for (const key in object) {
    if (!(object[key] == null || object[key].length === 0)) {
      clean[key] = object[key];
    }
  }
  return clean;
};
exports.sanitizeObject = sanitizeObject;
