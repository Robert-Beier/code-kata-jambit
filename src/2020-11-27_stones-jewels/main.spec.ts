import {countJewelsInStones} from "./main";

test('test', () => {
  const jewels = countJewelsInStones('aA', 'aAAbbbb')
  expect(jewels).toBe(3)
})
