import fs = require('fs');
import {getConnections} from "./getConnections";
import {convertMazeToBoolean} from "./utils";

const mazeString = fs.readFileSync(process.argv[2], 'utf8').toString();
const maze = convertMazeToBoolean(mazeString);
const connections = getConnections(maze);
connections.forEach(connection => console.log(`Input ${connection.entryColumn} -> Output ${connection.exitColumn}`));
