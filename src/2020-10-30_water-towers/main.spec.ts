import {
  getWaterAmountBetweenBorderTowers, getWaterAmountBetweenTowers,
  getWaterAmountBetweenTwoTowers,
  getWaterAreas,
  getWaterLevelBetweenBorderTowers
} from "./main";

describe('getWaterAmountForArea should', () => {
  test('return correct result for example 1', () => {
    const amount = getWaterAmountBetweenTwoTowers([2,2,2], 3);

    expect(amount).toBe(3)
  })
  test('return correct result for example 2', () => {
    const amount = getWaterAmountBetweenTwoTowers([4,5,3], 6);

    expect(amount).toBe(6)
  })
  test('return correct result for example 3', () => {
    const amount = getWaterAmountBetweenTwoTowers([5,4,3], 6);

    expect(amount).toBe(6)
  })
})

describe('getWaterLevelBetweenBorderTowers', () => {
  test('return correct result for example 1', () => {
    const waterLevel = getWaterLevelBetweenBorderTowers(5, 6);

    expect(waterLevel).toBe(5);
  })
  test('return correct result for example 2', () => {
    const waterLevel = getWaterLevelBetweenBorderTowers(10, 2);

    expect(waterLevel).toBe(2);
  })
})

describe('getWaterAmountBetweenBorderTowers', () => {
  test('return correct result for example 1', () => {
    const amount = getWaterAmountBetweenBorderTowers([3,2,2,2,5]);

    expect(amount).toBe(3);
  })
  test('return correct result for example 2', () => {
    const amount = getWaterAmountBetweenBorderTowers([10,4,5,3,6]);

    expect(amount).toBe(6);
  })
})

describe('getWaterAreas', () => {
  test('return correct result for example 1', () => {
    const waterAreas = getWaterAreas([5,3,6,1,2,10])

    expect(waterAreas).toEqual([[5,3,6], [6,1,2,10]])
  })
  test('return correct result for example 2', () => {
    const waterAreas = getWaterAreas([6,3,5,1,2,10])

    expect(waterAreas).toEqual([[6,3,5,1,2,10]])
  })
  test('return correct result for example 3', () => {
    const waterAreas = getWaterAreas([6,3,10,1,5,3])

    expect(waterAreas).toEqual([[6,3,10],[10, 1, 5]])
  })
})

describe('getWaterAmountBetweenTowers', () => {
  test('return correct result for example 1', () => {
    const amount = getWaterAmountBetweenTowers([1, 5, 3, 7, 2])

    expect(amount).toBe(2);
  })
  test('return correct result for example 2', () => {
    const amount = getWaterAmountBetweenTowers(
        [5, 3, 7, 2, 6, 4, 5, 9, 1, 2])

    expect(amount).toBe(14);
  })
  test('return correct result for example 3', () => {
    const amount = getWaterAmountBetweenTowers([2, 6, 3, 5, 2, 8, 1, 4, 2, 2, 5, 3, 5, 7, 4, 1])

    expect(amount).toBe(35);
  })
  test('return correct result for example 4', () => {
    const amount = getWaterAmountBetweenTowers([5, 5, 5, 5])

    expect(amount).toBe(0);
  })
  test('return correct result for example 5', () => {
    const amount = getWaterAmountBetweenTowers([5, 6, 7, 8])

    expect(amount).toBe(0);
  })
  test('return correct result for example 6', () => {
    const amount = getWaterAmountBetweenTowers(
        [8, 7, 7, 6])

    expect(amount).toBe(0);
  })
  test('return correct result for example 7', () => {
    const amount = getWaterAmountBetweenTowers([6, 7, 10, 7, 6])

    expect(amount).toBe(0);
  })
})
