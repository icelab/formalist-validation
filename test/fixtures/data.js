export default {
  ARRAY: [1,2,3],
  ARRAY_EMPTY: [],
  DATE: new Date(),
  FALSE: false,
  FLOAT_SMALL: 1.5,
  FLOAT_LARGE: 100.5,
  INT_SMALL: 1,
  INT_LARGE: 100,
  NOT_A_NUMBER: NaN,
  OBJECT: { a: 1, b: 2, c: 3},
  OBJECT_METHOD: {
    method: () => ( true )
  },
  OBJECT_EMPTY: {},
  STRING: 'String to test',
  STRING_EMPTY: '',
  TRUE: true,
  TRUTHY: [1, '1', 10, 'true', 'foo', new Date(), [], {}],
  FALSY: [0, '0', 'false', '', undefined, null, NaN],
}
