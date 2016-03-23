'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorMessage;

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractPlaceHolders(message) {
  return message.match(/(?:%\{)(.*?)(?:\})/gm);
}

function replace(message, options) {
  var placeholders = extractPlaceHolders(message);
  while (placeholders && placeholders.length) {
    var placeholder = placeholders.shift();
    var key = placeholder.replace(/%\{(.*?)\}/gm, '$1');
    var regex = new RegExp(placeholder.replace(/\{/gm, '\\{').replace(/\}/gm, '\\}'));
    message = message.replace(regex, options[key]);
  }
  return message;
}

var passThroughMessage = function passThroughMessage(message) {
  return replace(message);
};

var errors = {
  'array': passThroughMessage,

  'empty': passThroughMessage,

  'exclusion': function exclusion(message, value, list) {
    var options = { list: list };
    return replace(message, options);
  },

  'filled': passThroughMessage,

  'format': passThroughMessage,

  'gt': function gt(message, value, num) {
    var options = { num: num };
    return replace(message, options);
  },

  'gteq': function gteq(message, value, num) {
    var options = { num: num };
    return replace(message, options);
  },

  'inclusion': function inclusion(message, value, list) {
    var options = { list: list };
    return replace(message, options);
  },

  'bool': passThroughMessage,

  'true': passThroughMessage,

  'false': passThroughMessage,

  'int': passThroughMessage,

  'num': passThroughMessage,

  'date': passThroughMessage,

  'date_time': passThroughMessage,

  'key': passThroughMessage,

  'attr': passThroughMessage,

  'lt': function lt(message, value, num) {
    var options = { num: num, value: value };
    return replace(message, options);
  },

  'lteq': function lteq(message, value, num) {
    var options = { num: num };
    return replace(message, options);
  },

  'max_size': function max_size(message, value, num) {
    var options = { num: num };
    return replace(message, options);
  },

  'min_size': function min_size(message, value, num) {
    var options = { num: num };
    return replace(message, options);
  },

  'none': passThroughMessage,

  'str': passThroughMessage
};

function errorMessage(lang, predicate, value) {
  var localisedMessages = _messages2.default[lang] || _messages2.default['en'];
  var message = localisedMessages[predicate];

  for (var _len = arguments.length, params = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  return errors[predicate].apply(errors, [message, value].concat(params));
}