import messages from './messages'

/**
 * Extract placeholders from a `message`
 * @param  {String} message Message with placeholders defined by this %{format}
 * @return {Array} List of matches
 */
function extractPlaceHolders (message) {
  return message.match(/(?:%\{)(.*?)(?:\})/gm)
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
  const placeholders = extractPlaceHolders(message)
  while (placeholders && placeholders.length) {
    let placeholder = placeholders.shift()
    let key = placeholder.replace(/%\{(.*?)\}/gm, '$1')
    let regex = new RegExp(placeholder.replace(/\{/gm, '\\{').replace(/\}/gm, '\\}'))
    message = message.replace(regex, options[key])
  }
  return message
}

/**
 * For messages that don’t need replacement. Simply return the same string.
 * Consolidated into a single function for clarity.
 *
 * @param  {String} message Message that doesn’t need replacement
 * @return {String} The same `message` string
 */
const passThroughMessage = (message) => (message)

/**
 * The set of predicates with matching functions to extract any replacement
 * values before passing them into be replaced
 * @type {Object}
 */
const errors = {
  'array': passThroughMessage,

  'empty': passThroughMessage,

  'exclusion': (message, value, list) => {
    let options = { list }
    return replace(message, options)
  },

  'filled': passThroughMessage,

  'format': passThroughMessage,

  'gt': (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  'gteq': (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  'inclusion': (message, value, list) => {
    let options = { list }
    return replace(message, options)
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

  'lt': (message, value, num) => {
    let options = { num, value }
    return replace(message, options)
  },

  'lteq': (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  'max_size': (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  'min_size': (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  'none': passThroughMessage,

  'str': passThroughMessage
}

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
export default function errorMessage(lang, predicate, value, ...params) {
  const localisedMessages = messages[lang] || messages['en']
  const message = localisedMessages[predicate]
  return errors[predicate](message, value, ...params)
}
