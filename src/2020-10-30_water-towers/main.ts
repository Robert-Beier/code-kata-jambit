export function getWaterAmountBetweenTwoTowers(towersInArea: number[], waterLevel: number): number {
  return towersInArea.map(towerHeight => waterLevel- towerHeight).reduce((amount, waterHeight) => amount + waterHeight, 0);
}

export function getWaterAmountBetweenBorderTowers(towersIncludingBorderTowers: number[]): number {
  const waterLevel = getWaterLevelBetweenBorderTowers(towersIncludingBorderTowers[0], towersIncludingBorderTowers[towersIncludingBorderTowers.length - 1])
  return getWaterAmountBetweenTwoTowers(towersIncludingBorderTowers.slice(1, towersIncludingBorderTowers.length - 1),waterLevel)
}

export function getWaterLevelBetweenBorderTowers(towerA: number, towerB: number): number {
  return Math.min(towerA, towerB);
}

export function getWaterAreas(towers: number[]): number[][] {
  const areas = [];
  let lastHighestTower = 0;
  let lastSecondHighestTower : number | null = null;
  for (let i = 1; i < towers.length; i++) {
    if (lastHighestTower !== null && towers[i] >= towers[lastHighestTower]) {
      if (i - lastHighestTower > 1) {
        areas.push(towers.slice(lastHighestTower, i + 1));
      }
      lastHighestTower = i;
      lastSecondHighestTower = null;
    } else if ((lastSecondHighestTower === null || towers[i] > towers[lastSecondHighestTower]) ) {
      lastSecondHighestTower = i;
    }
  }
  if (lastSecondHighestTower && lastSecondHighestTower - lastHighestTower > 1) {
    areas.push(towers.slice(lastHighestTower, lastSecondHighestTower + 1))
  }
  return areas;
}

export function getWaterAmountBetweenTowers(towers: number[]): number {
  const areas = getWaterAreas(towers);
  return areas.map(area => getWaterAmountBetweenBorderTowers(area)).reduce((fullAmount, amountForArea) => fullAmount + amountForArea, 0);
}
