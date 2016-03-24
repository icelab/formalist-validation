import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'is missing'

test('it should test the "attr" predicate', (assert) => {

  const schema = {
    'attr': 'method'
  }
  const validate = validation(schema)

  let pass = validate(data.OBJECT_METHOD)
  let fail = validate(data.OBJECT)
  let failEmpty = validate(data.OBJECT_EMPTY)
  assert.ok(pass.length === 0, 'object method')
  assert.deepLooseEqual(fail, [message], 'object')
  assert.deepLooseEqual(failEmpty, [message], 'empty object')
  assert.end()
})
