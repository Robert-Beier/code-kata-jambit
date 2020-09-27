type DieSide = 1 | 2 | 3 | 4 | 5 | 6;

interface Player {
    type: 'CPU',
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

function getCPURandomChoice() {
    return Math.random() < CPU_THROW_PROBABILITY ? Choice.THROW : Choice.PASS;
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

function playTurn(player: Player, score = 0): number {
    const choice = getCPURandomChoice();
    if (choice === Choice.PASS) {
        console.log(`${player.name} decided to pass`);
        return score;
    }
    console.log(`${player.name} decided to throw`);
    const dieSide = getRandomDieSide();
    console.log(`${player.name} threw a ${dieSide}`);
    return dieSide === 1 ? 0 : playTurn(player, score + dieSide);
}

function playGame() {
    const players: Player[] = [{
        type: 'CPU',
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
        const score = playTurn(activePlayer);
        console.log(`${activePlayer.name} scored ${score} points in this round.`);
        activePlayer.score += score;
        console.log(`${activePlayer.name} now has a score of ${activePlayer.score} points.`);
        activePlayer = getNextPlayer(players, activePlayer);
        winner = getWinner(players);
    }
    console.log(`And the winner is: ${winner.name}`);
}

playGame();
