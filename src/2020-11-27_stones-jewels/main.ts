export const countJewelsInStones = (jewels:string, stones: string) =>
  jewels
    .split('')
    .reduce((totalNumberOfMatches, jewel) => totalNumberOfMatches + (stones.match(new RegExp(jewel, 'g'))?.length || 0), 0);
