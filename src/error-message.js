import messages from './messages'

function extractPlaceHolders (message) {
  return message.match(/(?:%\{)(.*?)(?:\})/gm)
}

function replace(message, options) {
  const placeholders = extractPlaceHolders(message)
  while (placeholders && placeholders.length) {
    let placeholder = placeholders.shift()
    let key = placeholder.replace(/%\{(.*?)\}/gm, '$1')
    let regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"))
    message = message.replace(regex, options[key])
  }
  return message
}

const passThroughMessage = (message) => {
  return replace(message)
}

const errors = {
  "array?": passThroughMessage,

  "empty?": passThroughMessage,

  "exclusion?": (message, value, list) => {
    let options = { list }
    return replace(message, options)
  },

  "eql?": (message, value, eql_value) => {
    let options = { eql_value }
    return replace(message, options)
  },

  "filled?": passThroughMessage,

  "format?": passThroughMessage,

  "gt?": (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  "gteq?": (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  "hash?": passThroughMessage,

  "inclusion?": (message, value, list) => {
    let options = { list }
    return replace(message, options)
  },

  "bool?": passThroughMessage,

  "true?": passThroughMessage,

  "false?": passThroughMessage,

  "int?": passThroughMessage,

  "float?": passThroughMessage,

  "decimal?": passThroughMessage,

  "date?": passThroughMessage,

  "date_time?": passThroughMessage,

  "time?": passThroughMessage,

  "key?": passThroughMessage,

  "attr?": passThroughMessage,

  "lt?": (message, value, num) => {
    let options = { num, value }
    return replace(message, options)
  },

  "lteq?": (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  "max_size?": (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  "min_size?": (message, value, num) => {
    let options = { num }
    return replace(message, options)
  },

  "none?": passThroughMessage,

  "str?": passThroughMessage,

  "type?": "must be %{type}"
}

export default function errorMessage(lang, predicate, value, ...params) {
  const localisedMessages = messages[lang] || messages['en']
  const message = localisedMessages[predicate]
  return errors[predicate](message, value, ...params)
}
