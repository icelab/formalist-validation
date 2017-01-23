import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'must be an integer'

test('it should test the "int" predicate', (nest) => {

  const schema = {
    'int': true
  }
  const validate = validation(schema)

  nest.test('... and pass with an integer', (assert) => {
    let pass = validate(data.INT_SMALL)
    assert.ok(pass.length === 0, 'int')
    pass = validate(data.INT_LARGE)
    assert.ok(pass.length === 0, 'int')
    assert.end()
  })

  nest.test('... and fail against other data types', (assert) => {
    let schema = {
      'filled': true,
      'int': true
    }
    let validate = validation(schema)

    // Test all our data except ints
    let dataWithoutDate = Object.assign({}, data)
    delete dataWithoutDate.INT_SMALL
    delete dataWithoutDate.INT_LARGE

    for (let datum in dataWithoutDate) {
      let fail = validate(dataWithoutDate[datum])
      assert.ok(fail.includes(message), datum)
    }
    assert.end()
  })
})
