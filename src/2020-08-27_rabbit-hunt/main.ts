const example1 = '6\n' +
    '7 122\n' +
    '8 139\n' +
    '9 156\n' +
    '10 173\n' +
    '11 190\n' +
    '-100 1';

const example2 = '7\n' +
    '11 190\n' +
    '8 139\n' +
    '12 190\n' +
    '7 122\n' +
    '11 173\n' +
    '0 3\n' +
    '10 156'

const example3 = '7\n' +
    '0 10\n' +
    '10 173\n' +
    '11 190\n' +
    '0 200\n' +
    '-100 1\n' +
    '0 100\n' +
    '0 400'

const example4 = '8\n' +
    '7 122\n' +
    '8 139\n' +
    '8 173\n' +
    '9 156\n' +
    '10 173\n' +
    '10 139\n' +
    '11 122\n' +
    '12 105'

interface Point {
  x: number,
  y: number,
  id: number
}

const convertInputFileTextToPoints = (inputFileText: string): Point[] => {
  return inputFileText.split('\n').filter((_, index) => index > 0).map((pointText, index) => {
    return ({
      id: index,
      x: Number(pointText.split(' ')[0]),
      y: Number(pointText.split(' ')[1])
    });
  })
}

interface Line {
  startX: number,
  startY: number,
  rise: number
}

const getLine = (point1: Point, point2: Point): Line => {
  return {
    startX: point1.x,
    startY: point1.y,
    rise: (point2.y - point1.y) / (point2.x - point1.x)
  }
}

interface LineWithPoints {
  line: Line,
  points: Point[]
}

const isPointOnLine = (line: Line, point: Point) => {
  const riseToPoint = (point.y - line.startY) / (point.x - line.startX);
  return Math.abs(riseToPoint) === Math.abs(line.rise);
}

const getPointsOnLine = (line: Line, points: Point[]) => {
  return points.filter(point => isPointOnLine(line, point))
}

const getLinesWithPoints = (points: Point[]): LineWithPoints[] => {
  const linesWithPoints: LineWithPoints[] = [];

  for (let pointId1 = 0; pointId1 < points.length - 2; pointId1++) {
    for (let pointId2 = pointId1 + 1; pointId2 < points.length - 1; pointId2++) {
      const point1 = points[pointId1];
      const point2 = points[pointId2];
      const line = getLine(point1, point2);
      const remainingPoints = points.slice(pointId2 + 1);
      const pointsOnLine = getPointsOnLine(line, remainingPoints);
      if (pointsOnLine.length > 0) {
        linesWithPoints.push({line: line, points: [point1, point2, ...pointsOnLine]})
      }
    }
  }

  return linesWithPoints;
}

const getLineWithMaxPoints = (points: Point[]): LineWithPoints | null => {
  const linesWithPointsSorted = getLinesWithPoints(points).sort(
      (lineWithPoints1, lineWithPoints2) => lineWithPoints2.points.length - lineWithPoints1.points.length)
  return linesWithPointsSorted.length > 0 ? linesWithPointsSorted[0] : null;
}

const printResultForInputFileText = (inputFileText: string) => {
  const lineWithMaxPoints = getLineWithMaxPoints(convertInputFileTextToPoints(inputFileText));
  console.log(`Result: ${lineWithMaxPoints?.points?.length || '2'}`)
  console.log(lineWithMaxPoints)
}

console.log('Example 1');
printResultForInputFileText(example1);
console.log('Example 2');
printResultForInputFileText(example2);
console.log('Example 3');
printResultForInputFileText(example3);
console.log('Example 4');
printResultForInputFileText(example4);
