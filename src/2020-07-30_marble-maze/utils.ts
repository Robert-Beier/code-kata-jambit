export const convertMazeToBoolean = (maze: string): boolean[][] => {
  return maze.split('\n').map(row => row.split('').map(character => character === 'X'));
}
