import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'must be a date'

test('it should test the "date" predicate', (nest) => {

  const schema = {
    'date': true
  }
  const validate = validation(schema)

  nest.test('... and pass with a properly formatted date string', (assert) => {
    let pass = validate(data.DATE_STRING)
    assert.ok(pass.length === 0, 'date')
    assert.end()
  })

  nest.test('... and fail against other data types', (assert) => {
    let schema = {
      'filled': true,
      'date': true
    }
    let validate = validation(schema)

    // Test all our data except date
    let dataWithoutDate = Object.assign({}, data)
    delete dataWithoutDate.DATE_STRING

    for (let datum in dataWithoutDate) {
      let fail = validate(dataWithoutDate[datum])
      assert.ok(fail.includes(message), datum)
    }
    assert.end()
  })
})
