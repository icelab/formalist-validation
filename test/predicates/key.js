import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'is missing'

test('it should test the "key" predicate', (assert) => {

  const schema = {
    'key': 'a'
  }
  const validate = validation(schema)

  let pass = validate(data.OBJECT)
  let fail = validate(data.OBJECT_EMPTY)
  assert.ok(pass.length === 0, 'object')
  assert.deepLooseEqual(fail, [message], 'empty object')
  assert.end()
})
