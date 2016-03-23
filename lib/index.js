'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validation;

var _predicates = require('./predicates');

var _predicates2 = _interopRequireDefault(_predicates);

var _errorMessage = require('./error-message');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Curry a validation function against a schema object
 * @param  {Object} schema Validation schema to test against
 * @return {Function} Validation function pre-curried with the schema
 */
function validation(schema) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? { lang: 'en' } : arguments[1];
  var lang = options.lang;


  return function (value) {
    var errors = [];
    // Test each predicate in the schema
    for (var key in schema) {
      var valid = (0, _predicates2.default)(key, value, schema[key]);
      // Generate an error message for each one that fails
      if (!valid) {
        errors.push((0, _errorMessage2.default)(lang, key, value, schema[key]));
      }
    }
    return errors;
  };
}