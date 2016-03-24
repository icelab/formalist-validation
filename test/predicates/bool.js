import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'must be boolean'

test('it should test the "bool" predicate', (nest) => {

  const schema = {
    'bool': true
  }
  const validate = validation(schema)

  nest.test('... for `true`', (assert) => {
    let pass = validate(data.TRUE)
    assert.ok(pass.length === 0, 'true')
    assert.end()
  })

  nest.test('... for `false`', (assert) => {
    let pass = validate(data.FALSE)
    assert.ok(pass.length === 0, 'true')
    assert.end()
  })

  nest.test('... for truthy values', (assert) => {
    data.TRUTHY.forEach((truthy) => {
      let fail = validate(truthy)
      assert.deepLooseEqual(fail, [message], truthy)
    })
    assert.end()
  })

  nest.test('... for other falsy values', (assert) => {
    data.FALSY.forEach((falsy) => {
      let fail = validate(falsy)
      assert.ok(fail, [message], falsy)
    })
    assert.end()
  })
})
