// script.js

const gameData = {
    userScore: 0,
    computerScore: 0,
    time: 0,
    finalScore: 0,
    finalResult: '',
};

const buttons = document.querySelectorAll('.buttons button');
const resultEl = document.getElementById('result');
const userScoreEl = document.getElementById('user_score');
const computerScoreEl = document.getElementById('computer_score');
const playAgainButton = document.getElementById('play_again');
const gameEl = document.getElementById('game');
const timeEl = document.getElementById('time_remaining');
const resultScreenEl = document.querySelector('.result_screen');
const finalResultEl = document.getElementById('result_text');
const finalScoreEl = document.getElementById('your_score');

gameEl.style.display = 'block';
resultScreenEl.style.display = 'none';

countDown();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const compChoice = computerPlay();
        const playerChoice = button.id;
        const result = playRound(playerChoice, compChoice);
        updateResultText(result);
    });
});

playAgainButton.addEventListener('click', () => {
    resetGame();
    countDown();
});

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `You: ${playerSelection} || Computer: ${computerSelection} It's a Tie`;
    }

    const outcomes = {
        'rock-scissors': 'crushes',
        'paper-rock': 'covers',
        'scissors-paper': 'cuts',
    };

    const key = `${playerSelection.toLowerCase()}-${computerSelection.toLowerCase()}`;

    if (outcomes[key]) {
        gameData.userScore++;
        finalResults();
        return `You win! ${playerSelection} ${outcomes[key]} ${computerSelection}`;
    } else {
        gameData.computerScore++;
        finalResults();
        return `You lose! ${computerSelection} ${outcomes[`${computerSelection.toLowerCase()}-${playerSelection.toLowerCase()}`]} ${playerSelection}`;
    }
}

function countDown() {
    gameData.time = 15;
    const timer = setInterval(() => {
        gameData.time--;
        timeEl.textContent = gameData.time;
        if (gameData.time === 0) {
            clearInterval(timer);
            resultScreen();
        }
    }, 1000);
}

function resultScreen() {
    gameEl.style.display = 'none';
    resultScreenEl.style.display = 'block';
}

function updateResultText(result) {
    resultEl.textContent = result;

}

function finalResults() {
    gameData.finalScore = gameData.userScore;
    gameData.finalResult = getFinalResult();

    finalScoreEl.textContent = `Score: ${gameData.finalScore}`;
    finalResultEl.textContent = gameData.finalResult;

    userScoreEl.textContent = gameData.userScore;
    computerScoreEl.textContent = gameData.computerScore;
}

function getFinalResult() {
    if (gameData.userScore > gameData.computerScore) {
        return 'You Won!';
    } else if (gameData.userScore < gameData.computerScore) {
        return 'You Lost!';
    } else {
        return 'It\'s a Draw';
    }
}

function resetGame() {
    gameData.userScore = 0;
    gameData.computerScore = 0;
    gameData.finalScore = 0;
    userScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    resultEl.textContent = '';
    gameEl.style.display = 'block';
    resultScreenEl.style.display = 'none';
}
