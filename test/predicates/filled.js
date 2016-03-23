import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

test('it should test "filled"', (nest) => {

  const schema = {
    'filled': true
  }
  const validate = validation(schema)

  nest.test('... against strings', (assert) => {
    let noErrors = validate(data.STRING)
    let hasErrors = validate(data.STRING_EMPTY)
    assert.ok(noErrors.length === 0, 'string')
    assert.ok(hasErrors.length === 1, 'empty string')
    assert.end()
  })
  // nest.test('... against numbers', (assert) => {
  //   assert.ok(validate(data.INT_SMALL), 'int')
  //   assert.ok(validate(data.FLOAT_SMALL), 'float')
  //   assert.notOk(validate(data.NOT_A_NUMBER), 'NaN')
  //   assert.end()
  // })
})
