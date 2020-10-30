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

function towersHaveSpace(leftTower: number, rightTower: number) {
  return rightTower - leftTower > 1;
}

function isTowerHigher(towers: number[], leftTower: number, rightTower: number) {
  return towers[rightTower] > towers[leftTower];
}
function getArea(towers: number[], leftTower: number, rightTower: number) {
  return towers.slice(leftTower, rightTower + 1)
}

export function getWaterAreas(towersHeights: number[]): number[][] {
  const areas = [];
  let leftTower = 0;
  let rightTower : number | null = null;

  for (let currentTower = 1; currentTower < towersHeights.length; currentTower++) {
    if (isTowerHigher(towersHeights, leftTower, currentTower)) {
      if (towersHaveSpace(leftTower, currentTower)) {
        areas.push(getArea(towersHeights, leftTower, currentTower));
      }
      leftTower = currentTower;
      rightTower = null;
    } else if ((rightTower === null || isTowerHigher(towersHeights, rightTower, currentTower)) ) {
      rightTower = currentTower;
    }
  }
  if (rightTower && towersHaveSpace(leftTower, rightTower)) {
    areas.push(getArea(towersHeights, leftTower, rightTower))
  }
  return areas;
}

export function getWaterAmountBetweenTowers(towers: number[]): number {
  const areas = getWaterAreas(towers);
  return areas.map(area => getWaterAmountBetweenBorderTowers(area)).reduce((fullAmount, amountForArea) => fullAmount + amountForArea, 0);
}
