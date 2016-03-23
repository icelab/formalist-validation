function isInt (n) {
  return Number(n) === n && n % 1 === 0
}

function isFloat (n) {
  return Number(n) === n && n % 1 !== 0
}

function parseRegexFromString (format) {
  if (format instanceof RegExp) {
    return format
  } else {
    const matches = format.match(/^\/(.+)(?:\/([gimy]+)?)/)
    return new RegExp(matches[1], matches[2])
  }
}

const predicates = {
  'none?': (input) => (
    input == null
  ),

  'key?': (input, name) => {
    !!input[name]
  },

  'attr?': (input, name) => (
    input[name] && typeof input[name] === 'function'
  ),

  'empty?': (input) => {
    const type = typeof input
    if (type === 'string') {
      return !input
    } else if (type === 'number') {
      return isNaN(input)
    } else if (type === 'array') {
      return input.length === 0
    } else if (type === 'object') {
      const keys = Object.keys(input)
      return keys.length === 0
    }
    return !input
  },

  'filled?': (input) => (
    !predicates['empty?'](input)
  ),

  'bool?': (input) => (
    typeof input === 'boolean'
  ),

  'date?': (input) => (
    input instanceof Date
  ),

  'date_time?': (input) => (
    input instanceof Date
  ),

  'int?': (input) => (
    isInt(input)
  ),

  'float?': (input) => (
    isFloat(input)
  ),

  'str?': (input) => (
    typeof input === 'string'
  ),

  'array?': (input) => (
    input instanceof Array
  ),

  'lt?': (input, num) => (
    input < num
  ),

  'gt?': (input, num) => {
    return input > num
  },

  'lteq?': (input, num) => (
    !predicates['gt?'](input, num)
  ),

  'gteq?': (input, num) => (
    !predicates['lt?'](input, num)
  ),

  'size?': (input, size) => (
    predicates['array?'](input) && input.length === size
  ),

  'min_size?': (input, size) => (
    predicates['array?'](input) && input.length >= size
  ),

  'max_size?': (input, size) => (
    predicates['array?'](input) && input.length <= size
  ),

  'inclusion?': (input, list) => (
    predicates['array?'](list) && list.includes(input)
  ),

  'exclusion?': (input, list) => (
    !predicates['inclusion?'](input, list)
  ),

  'true?': (value) => (
    value === true
  ),

  'false?': (value) => (
    value === false
  ),

  'format?': (input, regex) => (
    parseRegexFromString(regex).test(input)
  )
}

export default function predicate(key, value, ...params) {
  return predicates[key](value, ...params)
}
