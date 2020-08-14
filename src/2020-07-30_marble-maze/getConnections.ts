enum Direction {
  LEFT= 'LEFT',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT'
}

interface Environment {
  left: boolean;
  right: boolean;
  down: boolean;
}

const getPotentialDirectionsForDown = (environment: Environment): Direction[] => {
  if (environment.right && !environment.left) {
    return [Direction.LEFT];
  } else if (!environment.right && environment.left) {
    return [Direction.RIGHT];
  } else if (!environment.right && !environment.left) {
    return [Direction.LEFT, Direction.RIGHT];
  } else {
    return [];
  }
}

const getPotentialDirectionsForLeft = (environment: Environment): Direction[] => {
  if (!environment.left) {
    return [Direction.LEFT];
  } else {
    return [];
  }
}

const getPotentialDirectionsForRight = (environment: Environment): Direction[] => {
  if (!environment.right) {
    return [Direction.RIGHT];
  } else {
    return [];
  }
}

const getPotentialDirections = (environment: Environment, direction: Direction): Direction[] => {
  if (!environment.down) {
    return [Direction.DOWN];
  }

  switch (direction) {
    case Direction.DOWN:
      return getPotentialDirectionsForDown(environment);
    case Direction.LEFT:
      return getPotentialDirectionsForLeft(environment);
    case Direction.RIGHT:
      return getPotentialDirectionsForRight(environment);
  }
}

const getEntryColumns = (mazeRow: boolean[]): number[] => {
  return mazeRow.reduce((entryColumns, isBlocked, index) =>
          !isBlocked ?
              [...entryColumns, index] :
              entryColumns,
      []);
}

const getEnvironment = (maze: boolean[][], currentColumn: number, currentRow: number): Environment => {
  return {
    left: currentColumn > 1 ? maze[currentRow][currentColumn - 1] : true,
    right: currentColumn < maze[currentRow].length - 1 ? maze[currentRow][currentColumn + 1] : true,
    down: maze[currentRow + 1][currentColumn]
  };
}

const getUpdatedColumn = (currentColumn: number, direction: Direction): number => {
  switch (direction) {
    case Direction.DOWN:
      return currentColumn;
    case Direction.LEFT:
      return currentColumn - 1;
    case Direction.RIGHT:
      return currentColumn + 1;
  }
}

const getUpdatedRow = (currentRow: number, direction: Direction): number => {
  if (direction === Direction.DOWN) {
    return currentRow + 1;
  }
  return currentRow;
}

const getExitColumns = (maze: boolean[][], currentColumn: number, currentRow: number, direction: Direction): number[] => {
  if (currentRow === maze.length - 1) {
    return [currentColumn];
  }

  const environment = getEnvironment(maze, currentColumn, currentRow);
  const potentialDirections = getPotentialDirections(environment, direction);
  return potentialDirections.flatMap(potentialDirection =>
      getExitColumns(
          maze,
          getUpdatedColumn(currentColumn, potentialDirection),
          getUpdatedRow(currentRow, potentialDirection),
          potentialDirection
      )
  );
}

export interface Connection {
  entryColumn: number;
  exitColumn: number | null;
}

const getConnectionsForEntryColumn = (maze: boolean[][], entryColumn: number): Connection[] => {
  const exitColumns = getExitColumns(maze, entryColumn, 0, Direction.DOWN);
  if (exitColumns.length === 0) {
    return [{
      entryColumn,
      exitColumn: null
    }];
  }
  return exitColumns.map(exitColumn => ({entryColumn, exitColumn}));
}

export const getConnections = (maze: boolean[][]): Connection[] => {
  const entryColumns = getEntryColumns(maze[0]);
  return entryColumns.flatMap(entryColumn => getConnectionsForEntryColumn(maze, entryColumn));
}
