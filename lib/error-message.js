'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorMessage;

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extract placeholders from a `message`
 * @param  {String} message Message with placeholders defined by this %{format}
 * @return {Array} List of matches
 */
function extractPlaceHolders(message) {
  return message.match(/(?:%\{)(.*?)(?:\})/gm);
}

/**
 * Replace placeholders in a `message` with their matching values in an
 * `options` object. For example:
 *
 *   replace('I am a %{thing}.', {thing: 'potato'})
 *   => I am a potato.
 *
 * @param  {String} message Message to be replaced
 * @param  {Object} options Object with replacement values as keys
 * @return {String} The replaced message
 */
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

/**
 * For messages that don’t need replacement. Simply return the same string.
 * Consolidated into a single function for clarity.
 *
 * @param  {String} message Message that doesn’t need replacement
 * @return {String} The same `message` string
 */
var passThroughMessage = function passThroughMessage(message) {
  return message;
};

/**
 * The set of predicates with matching functions to extract any replacement
 * values before passing them into be replaced
 * @type {Object}
 */
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

  'str': passThroughMessage
};

/**
 * Create an appropriate error message for a given predicate and its value
 *
 * @param  {String} lang The language key for messages. Defaults to 'en'.
 * @param  {String} predicate The name of the predicate
 * @param  {Mixed} value The value of the field
 * @param  {...Mixed} params A splat of any params related to the error. Passed
 * through in the same order they appear.
 * @return {String} An error message
 */
function errorMessage(lang, predicate, value) {
  var localisedMessages = _messages2.default[lang] || _messages2.default['en'];
  var message = localisedMessages[predicate];

  for (var _len = arguments.length, params = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  return errors[predicate].apply(errors, [message, value].concat(params));
}