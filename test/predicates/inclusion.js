import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

test('it should test the "inclusion" predicate', (nest) => {

  const schema = {
    'inclusion': [1,2,3]
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
