import test from 'tape'
import validation from '../src'
import data from './fixtures/data'

test('it should only test', (nest) => {
  nest.test('... when fields specify "filled"', (assert) => {
    const validateWithFilled = validation({
      'filled': true,
      'int': true
    })
    let pass = validateWithFilled(data.INT_SMALL)
    let fail = validateWithFilled(data.FLOAT_SMALL)
    assert.ok(pass.length === 0)
    assert.deepLooseEqual(fail, ['must be an integer'])
    assert.end()
  })

  nest.test('... or have a value', (assert) => {
    const validateWithoutFilled = validation({
      'int': true
    })
    let pass = validateWithoutFilled(data.INT_SMALL)
    let fail = validateWithoutFilled(null)
    assert.ok(pass.length === 0)
    assert.ok(fail.length === 0)
    assert.end()
  })
})
