import predicate from './predicates'
import errorMessage from './error-message'

/**
 * Curry a validation function against a schema object
 * @param  {Object} schema Validation schema to test against
 * @return {Function} Validation function pre-curried with the schema
 */
export default function validation (schema, options = {lang: 'en'}) {
  const { lang } = options

  return (value) => {
    const errors = []
    // Only run the tests if we are checking for `filled` or we have a
    // defined `value` to actually check
    if (schema.filled || value != null) {
      // Test each predicate in the schema
      for (let key in schema) {
        let valid = predicate(key, value, schema[key])
        // Generate an error message for each one that fails
        if (!valid) {
          errors.push(
            errorMessage(lang, key, value, schema[key])
          )
        }
      }
    }
    return errors
  }
}
