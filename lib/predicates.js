'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = predicate;
/**
 * Check if a value is an integer
 * @param  {Number} n Number to test
 * @return {Boolean}
 */
function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

/**
 * Parse a regex from a string.
 * @param  {String} format A regex defined as a string. Will turn '/foo/gi'
 * into /foo/gi
 * @return {RegExp} Parsed regex
 */
function parseRegexFromString(format) {
  if (format instanceof RegExp) {
    return format;
  } else {
    var matches = format.match(/^\/(.+)(?:\/([gimy]+)?)/);
    return new RegExp(matches[1], matches[2]);
  }
}

/**
 * Object holding the individual predicate tests
 * @type {Object}
 */
var predicates = {
  'key': function key(input, name) {
    return input[name] != null;
  },

  'attr': function attr(input, name) {
    return input[name] && typeof input[name] === 'function';
  },

  'empty': function empty(input) {
    var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
    if (input instanceof Date) {
      return false;
    } else if (type === 'string') {
      return !input;
    } else if (type === 'number') {
      return isNaN(input);
    } else if (type === 'array') {
      return input.length === 0;
    } else if (input && type === 'object') {
      var keys = Object.keys(input);
      return keys.length === 0;
    } else if (type === 'boolean') {
      return false;
    }
    return !input;
  },

  'filled': function filled(input) {
    return !predicates['empty'](input);
  },

  'bool': function bool(input) {
    return typeof input === 'boolean';
  },

  'date': function date(input) {
    return input instanceof Date;
  },

  'date_time': function date_time(input) {
    return input instanceof Date;
  },

  'int': function int(input) {
    return isInt(input);
  },

  'num': function num(input) {
    return typeof input === 'number';
  },

  'str': function str(input) {
    return typeof input === 'string';
  },

  'array': function array(input) {
    return input instanceof Array;
  },

  'lt': function lt(input, num) {
    return input < num;
  },

  'gt': function gt(input, num) {
    return input > num;
  },

  'lteq': function lteq(input, num) {
    return !predicates['gt'](input, num);
  },

  'gteq': function gteq(input, num) {
    return !predicates['lt'](input, num);
  },

  'size': function size(input, _size) {
    return predicates['array'](input) && input.length === _size;
  },

  'min_size': function min_size(input, size) {
    return predicates['array'](input) && input.length >= size;
  },

  'max_size': function max_size(input, size) {
    return predicates['array'](input) && input.length <= size;
  },

  'inclusion': function inclusion(input, list) {
    return predicates['array'](list) && list.includes(input);
  },

  'exclusion': function exclusion(input, list) {
    return !predicates['inclusion'](input, list);
  },

  'true': function _true(value) {
    return value === true;
  },

  'false': function _false(value) {
    return value === false;
  },

  'format': function format(input, regex) {
    return parseRegexFromString(regex).test(input);
  }
};

/**
 * Test a single predicate
 * @param  {String} key Name of the predicate to test
 * @param  {Mixed} value Value to test
 * @param  {...Mixed} params Splat of any additional params. Passed on in order.
 * @return {Bool} Result of the test
 */
function predicate(key, value) {
  var test = predicates[key];

  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  return test ? predicates[key].apply(predicates, [value].concat(params)) : true;
}