import { sum } from './main'

test('should return 2 given 1 and 1', () => {
  expect(sum(1, 1)).toBe(2)
})

test('should return 0 given 1 and -1', () => {
  expect(sum(1, -1)).toBe(0)
})
