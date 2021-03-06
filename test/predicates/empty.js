import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'cannot be empty'

test('it should test the "empty" predicate', (nest) => {

  const schema = {
    'empty': true
  }
  const validate = validation(schema)

  nest.test('... against strings', (assert) => {
    let pass = validate(data.STRING_EMPTY)
    let fail = validate(data.STRING)
    assert.ok(pass.length === 0, 'empty string')
    assert.deepLooseEqual(fail, [message], 'string')
    assert.end()
  })

  nest.test('... against numbers', (assert) => {
    let pass = validate(data.NOT_A_NUMBER)
    let failInt = validate(data.INT_SMALL)
    let failFloat = validate(data.FLOAT_SMALL)
    assert.ok(pass.length === 0, 'NaN')
    assert.deepLooseEqual(failInt, [message], 'int')
    assert.deepLooseEqual(failFloat, [message], 'float')
    assert.end()
  })

  nest.test('... against arrays', (assert) => {
    let pass = validate(data.ARRAY_EMPTY)
    let fail = validate(data.ARRAY)
    assert.ok(pass.length === 0, 'empty array')
    assert.deepLooseEqual(fail, [message], 'array')
    assert.end()
  })

  nest.test('... against objects', (assert) => {
    let pass = validate(data.OBJECT_EMPTY)
    let fail = validate(data.OBJECT)
    assert.ok(pass.length === 0, 'empty object')
    assert.deepLooseEqual(fail, [message], 'empty object')
    assert.end()
  })

  nest.test('... against booleans', (assert) => {
    let failTrue = validate(data.TRUE)
    let failFalse = validate(data.FALSE)
    assert.deepLooseEqual(failTrue, [message], 'true')
    assert.deepLooseEqual(failFalse, [message], 'false')
    assert.end()
  })

  nest.test('... against dates', (assert) => {
    let fail = validate(data.DATE)
    assert.deepLooseEqual(fail, [message], 'false')
    assert.end()
  })
})
