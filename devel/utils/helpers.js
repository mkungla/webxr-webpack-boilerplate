'use strict'

const parseArguments = array => {
  const getKey = arg => String(arg).trim().startsWith('-') ? arg.trim().replace(/^[-]+/, '') : false
  return array.reduce((previous, current, index, argsArray) => {
    const key = getKey(current)
    if (key) {
      let argVal = true
      if (index < argsArray.length - 1) {
        const n = String(argsArray[index + 1]).trim()
        if (!n.startsWith('-')) {
          argVal = argsArray[index + 1]
          argsArray.splice(index, 1)
        }
      }
      return {
        ...previous,
        [key]: argVal
      }
    }
    return previous
  }, {})
}
exports.parseArguments = parseArguments

const sanitizeObject = object => {
  const clean = {}
  for (const key in object) {
    if (!(object[key] == null || object[key].length === 0)) {
      clean[key] = object[key]
    }
  }
  return clean
}
exports.sanitizeObject = sanitizeObject
