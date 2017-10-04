import { round } from '../utils.js'

/* global expect it */

it('round function returns correctly', () => {
  expect(round(24.800000032424, 2)).toEqual(24.8)
})
