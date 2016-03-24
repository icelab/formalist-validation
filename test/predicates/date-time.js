import test from 'tape'
import validation from '../../src'
import data from '../fixtures/data'

const message = 'must be a date time'

test('it should test the "date_time" predicate', (nest) => {

  const schema = {
    'date_time': true
  }
  const validate = validation(schema)

  nest.test('... and pass with a date-time string', (assert) => {
    let pass = validate(data.DATE_TIME_STRING)
    assert.ok(pass.length === 0, 'date')
    assert.end()
  })

  nest.test('... and fail against other data types', (assert) => {
    let schema = {
      'filled': true,
      'date_time': true
    }
    let validate = validation(schema)

    // Test all our data except data
    let dataWithoutDate = Object.assign({}, data)
    delete dataWithoutDate.DATE_TIME_STRING

    for (let datum in dataWithoutDate) {
      let fail = validate(dataWithoutDate[datum])
      assert.ok(fail.includes(message), datum)
    }
    assert.end()
  })
})
