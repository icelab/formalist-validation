import test from 'tape'
import validation from '../src'
import data from './fixtures/data'

test('it should test "filled?"', (nest) => {

  const schema = {
    'filled?': true
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

test('it should test "gt?"', (nest) => {

  const schema = {
    'gt?': 5
  }
  const validate = validation(schema)

  nest.test('... against integers', (assert) => {
    let pass = validate(data.INT_LARGE)
    let fail = validate(data.INT_SMALL)
    assert.ok(pass.length === 0)
    assert.deepLooseEqual(fail, ['must be greater than 5'])
    assert.end()
  })
})

test('it should test "inclusion?"', (nest) => {

  const schema = {
    'inclusion?': [1,2,3]
  }
  const validate = validation(schema)

  nest.test('... against integers', (assert) => {
    let pass = validate(data.INT_SMALL)
    let fail = validate(data.INT_LARGE)
    assert.ok(pass.length === 0, 'int small')
    assert.deepLooseEqual(fail, ['must be one of: 1,2,3'], 'int large')
    assert.end()
  })
})
