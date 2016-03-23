/**
 * Check if a value is an integer
 * @param  {Number} n Number to test
 * @return {Boolean}
 */
function isInt (n) {
  return Number(n) === n && n % 1 === 0
}

/**
 * Parse a regex from a string.
 * @param  {String} format A regex defined as a string. Will turn '/foo/gi'
 * into /foo/gi
 * @return {RegExp} Parsed regex
 */
function parseRegexFromString (format) {
  if (format instanceof RegExp) {
    return format
  } else {
    const matches = format.match(/^\/(.+)(?:\/([gimy]+)?)/)
    return new RegExp(matches[1], matches[2])
  }
}

/**
 * Object holding the individual predicate tests
 * @type {Object}
 */
const predicates = {
  'none': (input) => (
    input == null
  ),

  'key': (input, name) => {
    !!input[name]
  },

  'attr': (input, name) => (
    input[name] && typeof input[name] === 'function'
  ),

  'empty': (input) => {
    const type = typeof input
    if (type === 'string') {
      return !input
    } else if (type === 'number') {
      return isNaN(input)
    } else if (type === 'array') {
      return input.length === 0
    } else if (input && type === 'object') {
      const keys = Object.keys(input)
      return keys.length === 0
    }
    return !input
  },

  'filled': (input) => (
    !predicates['empty'](input)
  ),

  'bool': (input) => (
    typeof input === 'boolean'
  ),

  'date': (input) => (
    input instanceof Date
  ),

  'date_time': (input) => (
    input instanceof Date
  ),

  'int': (input) => (
    isInt(input)
  ),

  'num': (input) => (
    typeof input === 'number'
  ),

  'str': (input) => (
    typeof input === 'string'
  ),

  'array': (input) => (
    input instanceof Array
  ),

  'lt': (input, num) => (
    input < num
  ),

  'gt': (input, num) => {
    return input > num
  },

  'lteq': (input, num) => (
    !predicates['gt'](input, num)
  ),

  'gteq': (input, num) => (
    !predicates['lt'](input, num)
  ),

  'size': (input, size) => (
    predicates['array'](input) && input.length === size
  ),

  'min_size': (input, size) => (
    predicates['array'](input) && input.length >= size
  ),

  'max_size': (input, size) => (
    predicates['array'](input) && input.length <= size
  ),

  'inclusion': (input, list) => (
    predicates['array'](list) && list.includes(input)
  ),

  'exclusion': (input, list) => (
    !predicates['inclusion'](input, list)
  ),

  'true': (value) => (
    value === true
  ),

  'false': (value) => (
    value === false
  ),

  'format': (input, regex) => (
    parseRegexFromString(regex).test(input)
  )
}

/**
 * Test a single predicate
 * @param  {String} key Name of the predicate to test
 * @param  {Mixed} value Value to test
 * @param  {...Mixed} params Splat of any additional params. Passed on in order.
 * @return {Bool} Result of the test
 */
export default function predicate(key, value, ...params) {
  return predicates[key](value, ...params)
}
