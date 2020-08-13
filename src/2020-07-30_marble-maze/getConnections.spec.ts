import {Connection, getConnections} from "./getConnections";
import {convertMazeToBoolean} from "./utils";

describe('getConnections', () => {
  it('should solve maze "a marble can\'t roll up"', () => {
    const maze = convertMazeToBoolean(
        'X XXXXX\n' +
        'X X   X\n' +
        'X   X X\n' +
        'XXXXX X'
    );
    const expected: Connection[] = [{
      entryColumn: 1,
      exitColumn: null
    }];
    const actual = getConnections(maze);
    expect(actual).toEqual(expected);
  });


  it('should solve maze "a marble always rolls, if a way is available"', () => {
    const maze = convertMazeToBoolean(
        'XXXXXXXXXXXXXX XXXXXXXXXXXXXX\n' +
        'X                           X\n' +
        'X XXXXXXXXXXXXXXXXXXXXXXXXX X'
    );
    const expected: Connection[] = [{
      entryColumn: 14,
      exitColumn: 1
    }, {
      entryColumn: 14,
      exitColumn: 27
    }];
    const actual = getConnections(maze);
    expect(actual).toEqual(expected);
  });


  it('should solve maze "A marble can\'t go slantwise"', () => {
    const maze = convertMazeToBoolean(
        'X XXX\n' +
        'XX XX\n' +
        'XXX X'
    );
    const expected: Connection[] = [{
      entryColumn: 1,
      exitColumn: null
    }];
    const actual = getConnections(maze);
    expect(actual).toEqual(expected);
  });


  it('should solve maze "Not all ways are used by the marble"', () => {
    const maze = convertMazeToBoolean(
        'XXXXXXXXXXXX XXXXXXXXXXXXXXX\n' +
        'X                          X\n' +
        'XX XXXXX XXXXXX XXXXXXXXX XX'
    );
    const expected: Connection[] = [{
      entryColumn: 12,
      exitColumn: 8
    }, {
      entryColumn: 12,
      exitColumn: 15
    }];
    const actual = getConnections(maze);
    expect(actual).toEqual(expected);
  });

  it('should solve maze "marbles fall straight down"', () => {
    const maze = convertMazeToBoolean(
        'XXXXX XXXXXX\n' +
        'X          X\n' +
        'X          X\n' +
        'X          X\n' +
        'X XXX XXXX X'
    );
    const expected: Connection[] = [{
      entryColumn: 5,
      exitColumn: 5
    }];
    const actual = getConnections(maze);
    expect(actual).toEqual(expected);
  });

  it('should solve maze "only none"', () => {
    const maze = convertMazeToBoolean(
        ' XX XXX XXX XX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXX \n' +
        ' XX XXX XX XXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXX \n' +
        ' XX XXX XX XXX XXXXXXXXXXX XXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                       XXX \n' +
        'XXXXXX XXXX XX XX   XX   X XXX           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                       XXX \n' +
        'XXXXXX XXXX XX    X XX X   XXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                       XXX \n' +
        'XXXXXX XXXX XXXXXXX XX XXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                       XXXX\n' +
        'XXXXXX XXXX XXXXXXX XX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    );
    const expected: Connection[] = [
      {
        entryColumn: 0,
        exitColumn: null
      },
      {
        entryColumn: 3,
        exitColumn: null
      },
      {
        entryColumn: 7,
        exitColumn: null
      },
      {
        entryColumn: 11,
        exitColumn: null
      },
      {
        entryColumn: 14,
        exitColumn: null
      },
      {
        entryColumn: 26,
        exitColumn: null
      },
      {
        entryColumn: 38,
        exitColumn: null
      },
      {
        entryColumn: 126,
        exitColumn: null
      },
      {
        entryColumn: 135,
        exitColumn: null
      }];
    const actual = getConnections(maze);
    expect(actual).toEqual(expected);
  });
});
