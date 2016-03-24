import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'must be filled'

test('it should test the "filled" predicate', (nest) => {

  const schema = {
    'filled': true
  }
  const validate = validation(schema)

  nest.test('... against strings', (assert) => {
    let pass = validate(data.STRING)
    let fail = validate(data.STRING_EMPTY)
    assert.ok(pass.length === 0, 'string')
    assert.deepLooseEqual(fail, [message], 'empty string')
    assert.end()
  })

  nest.test('... against numbers', (assert) => {
    let passInt = validate(data.INT_SMALL)
    let passFloat = validate(data.FLOAT_SMALL)
    let fail = validate(data.NOT_A_NUMBER)
    assert.ok(passInt.length === 0, 'int')
    assert.ok(passFloat.length === 0, 'float')
    assert.deepLooseEqual(fail, [message], 'NaN')
    assert.end()
  })

  nest.test('... against arrays', (assert) => {
    let pass = validate(data.ARRAY)
    let fail = validate(data.ARRAY_EMPTY)
    assert.ok(pass.length === 0, 'array')
    assert.deepLooseEqual(fail, [message], 'empty array')
    assert.end()
  })

  nest.test('... against objects', (assert) => {
    let pass = validate(data.OBJECT)
    let fail = validate(data.OBJECT_EMPTY)
    assert.ok(pass.length === 0, 'object')
    assert.deepLooseEqual(fail, [message], 'empty object')
    assert.end()
  })

  nest.test('... against booleans', (assert) => {
    let passTrue = validate(data.TRUE)
    let passFalse = validate(data.FALSE)
    assert.ok(passTrue.length === 0, 'true')
    assert.ok(passFalse.length === 0, 'false')
    assert.end()
  })

  nest.test('... against dates', (assert) => {
    let pass = validate(data.DATE)
    assert.ok(pass.length === 0, 'true')
    assert.end()
  })
})
