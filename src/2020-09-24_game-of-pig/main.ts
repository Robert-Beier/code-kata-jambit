import * as inquirer from 'inquirer';

type DieSide = 1 | 2 | 3 | 4 | 5 | 6;

interface Player {
    type: 'CPU' | 'HUMAN',
    score: number,
    name: string
}

enum Choice {
    THROW,
    PASS
}

const CPU_THROW_PROBABILITY = 0.7;
const WINNING_SCORE = 100;

function getRandomDieSide() {
    return Math.ceil(Math.random() * 6) as DieSide;
}

function getHumanChoice() {
    return inquirer.prompt<{throwChoice: boolean}>([{
        type: 'confirm',
        name: 'throwChoice',
        message: 'Do you want to throw again?',
        default: true
    }]).then(answers => answers.throwChoice ? Choice.THROW : Choice.PASS);
}

function getCPURandomChoice() {
    return Math.random() < CPU_THROW_PROBABILITY ? Choice.THROW : Choice.PASS;
}

async function getPlayerChoice(player: Player) {
    if (player.type === 'CPU') {
        return getCPURandomChoice();
    } else {
        return getHumanChoice();
    }
}

function getNextPlayer(players: Player[], activePlayer: Player) {
    const activePlayerIndex = players.indexOf(activePlayer);
    return players[(activePlayerIndex + 1) % players.length];
}

function getWinner(players: Player[]): Player | null {
    const winners = players
        .filter(player => player.score >= WINNING_SCORE)
        .sort((playerA, playerB) => playerB.score - playerA.score);
    return winners.length > 0 ? winners[0] : null;
}

async function playTurn(player: Player, score = 0): Promise<number> {
    const dieSide = getRandomDieSide();
    console.log(`${player.name} threw a ${dieSide}`);
    if (dieSide === 1) {
        return 0;
    }
    const choice = await getPlayerChoice(player);
    if (choice === Choice.PASS) {
        console.log(`${player.name} decided to pass`);
        return score;
    }
    console.log(`${player.name} decided to throw`);
    return playTurn(player, score + dieSide);
}

async function playGame() {
    const players: Player[] = [{
        type: 'HUMAN',
        score: 0,
        name: 'Player One'
    }, {
        type: 'CPU',
        score: 0,
        name: 'Player Two'
    }];
    let activePlayer = players[0];
    let winner: Player | null = null;

    while (!winner) {
        console.log(`Start of round for: ${activePlayer.name}`);
        const score = await playTurn(activePlayer);
        console.log(`${activePlayer.name} scored ${score} points in this round.`);
        activePlayer.score += score;
        console.log(`${activePlayer.name} now has a score of ${activePlayer.score} points.`);
        activePlayer = getNextPlayer(players, activePlayer);
        winner = getWinner(players);
    }
    console.log(`And the winner is: ${winner.name}`);
}

playGame();
