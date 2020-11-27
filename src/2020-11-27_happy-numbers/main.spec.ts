import {isNumberHappy} from "./main";

describe('isNumberHappy', () => {
  test('1', () => {
    expect(isNumberHappy(1)).toBeTruthy();
  })
  test('19', () => {
    expect(isNumberHappy(19)).toBeTruthy();
  })
  test('347', () => {
    expect(isNumberHappy(347)).toBeFalsy();
  })
})
