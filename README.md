# Formalist Validation

Data validation library for Formalist based on predicate logic.

The scope of the library is very simple. It tests a `value` against a given `schema` and returns an array of relevant error messages.

## Usage

```js
import validation from 'formalist-validation'

// Define a schema
const schema = {
  "filled": true,
  "min_size": 2,
  "max_size": 3,
}

// Curry validator with the schema
const validator = validation(schema)

// Test
validator([1])
// => ['size cannot be less than 2']
validator([1,2])
// => []
validator([1,2,3])
// => []
validator([1,2,3,4])
// => ['size cannot be greater than 3']
```

View [the full list of available predicates](https://github.com/icelab/formalist-validation/blob/master/src/predicates.js) to see what else you can test.

## Caveats

* Tests will only be run if there’s a `value` to test *or* the schema specifies that to test that the `value` is `'filled'`.
* All the predicate tests are run as logical `AND`s. There’s no support for more complex logic at at the moment.

## TODO

* [ ] Allow custom validations to be injected
* [ ] i18n support
