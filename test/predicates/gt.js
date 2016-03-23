import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

test('it should test "gt"', (nest) => {

  const schema = {
    'gt': 5
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
