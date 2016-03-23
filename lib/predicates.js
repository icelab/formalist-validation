'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = predicate;
function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function parseRegexFromString(format) {
  if (format instanceof RegExp) {
    return format;
  } else {
    var matches = format.match(/^\/(.+)(?:\/([gimy]+)?)/);
    return new RegExp(matches[1], matches[2]);
  }
}

var predicates = {
  'none?': function none(input) {
    return input == null;
  },

  'key?': function key(input, name) {
    !!input[name];
  },

  'attr?': function attr(input, name) {
    return input[name] && typeof input[name] === 'function';
  },

  'empty?': function empty(input) {
    var type = typeof input === 'undefined' ? 'undefined' : _typeof(input);
    if (type === 'string') {
      return !input;
    } else if (type === 'number') {
      return isNaN(input);
    } else if (type === 'array') {
      return input.length === 0;
    } else if (type === 'object') {
      var keys = Object.keys(input);
      return keys.length === 0;
    }
    return !input;
  },

  'filled?': function filled(input) {
    return !predicates['empty?'](input);
  },

  'bool?': function bool(input) {
    return typeof input === 'boolean';
  },

  'date?': function date(input) {
    return input instanceof Date;
  },

  'date_time?': function date_time(input) {
    return input instanceof Date;
  },

  'int?': function int(input) {
    return isInt(input);
  },

  'float?': function float(input) {
    return isFloat(input);
  },

  'str?': function str(input) {
    return typeof input === 'string';
  },

  'array?': function array(input) {
    return input instanceof Array;
  },

  'lt?': function lt(input, num) {
    return input < num;
  },

  'gt?': function gt(input, num) {
    return input > num;
  },

  'lteq?': function lteq(input, num) {
    return !predicates['gt?'](input, num);
  },

  'gteq?': function gteq(input, num) {
    return !predicates['lt?'](input, num);
  },

  'size?': function size(input, _size) {
    return predicates['array?'](input) && input.length === _size;
  },

  'min_size?': function min_size(input, size) {
    console.log('!!! input', input);
    console.log('!!! size', size);
    return predicates['array?'](input) && input.length >= size;
  },

  'max_size?': function max_size(input, size) {
    return predicates['array?'](input) && input.length <= size;
  },

  'inclusion?': function inclusion(input, list) {
    return predicates['array?'](list) && list.includes(input);
  },

  'exclusion?': function exclusion(input, list) {
    return !predicates['inclusion?'](input, list);
  },

  'true?': function _true(value) {
    return value === true;
  },

  'false?': function _false(value) {
    return value === false;
  },

  'format?': function format(input, regex) {
    return parseRegexFromString(regex).test(input);
  }
};

function predicate(key, value) {
  for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  return predicates[key].apply(predicates, [value].concat(params));
}