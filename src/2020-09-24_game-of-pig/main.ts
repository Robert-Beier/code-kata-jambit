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

function getWinner(playerOne: Player, playerTwo: Player): Player | null {
    const winners = [playerOne, playerTwo]
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
    const playerOne: Player = {
        type: 'CPU',
        score: 0,
        name: 'Player One'
    }
    const playerTwo: Player = {
        type: 'CPU',
        score: 0,
        name: 'Player Two'
    }
    let activePlayer = playerOne;
    let winner: Player | null = null;

    while (!winner) {
        console.log(`Start of round for: ${activePlayer.name}`);
        const score = playTurn(activePlayer);
        console.log(`${activePlayer.name} scored ${score} points in this round.`);
        activePlayer.score += score;
        console.log(`${activePlayer.name} now has a score of ${activePlayer.score} points.`);
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
        winner = getWinner(playerOne, playerTwo);
    }
    console.log(`And the winner is: ${winner.name}`);
}

playGame();
