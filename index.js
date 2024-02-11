const rockBtn = document.querySelector("#rockBtn")
const paperBtn = document.querySelector("#paperBtn")
const scissorBtn = document.querySelector("#scissorBtn")
const resultDiv = document.querySelector(".result");
const winnerDiv = document.querySelector(".winner")
const playerScoreDiv = document.querySelector(".player-score")
const computerScoreDiv = document.querySelector(".computer-score")
const winnerModal = document.querySelector(".winner-modal")
const closeModalBtn = document.querySelector(".close-modal")

console.log(winnerDiv)

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}

function getComputerChoice() {
    const choiceNum = getRandomInt(2);
    let choiceStr = "";

    switch (choiceNum) {
        case 0:
            choiceStr = "ROCK";
            break;
        case 1:
            choiceStr = "PAPER";
            break;
        case 2:
            choiceStr = "SCISSOR";
            break;
    }

    return choiceStr
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice !== "ROCK" && playerChoice !== "PAPER" && playerChoice !== "SCISSOR") {
        return "Invalid Input!"
    }

    if (
        computerChoice === "ROCK" && playerChoice === "ROCK" ||
        computerChoice === "PAPER" && playerChoice === "PAPER" ||
        computerChoice === "SCISSOR" && playerChoice === "SCISSOR"
    ) {
        return `Tie! Both side chose ${computerChoice}`
    }

    if (
        computerChoice === "ROCK" && playerChoice === "SCISSOR" ||
        computerChoice === "PAPER" && playerChoice === "ROCK" ||
        computerChoice === "SCISSOR" && playerChoice === "PAPER"
    ) {
        return `You Lose! ${computerChoice} beats ${playerChoice}`
    }

    if (
        computerChoice === "SCISSOR" && playerChoice === "ROCK" ||
        computerChoice === "PAPER" && playerChoice === "SCISSOR" ||
        computerChoice === "ROCK" && playerChoice === "PAPER"
    ) {
        return `You Win! ${playerChoice} beats ${computerChoice}`
    }

    return "ERROR"
}

let playerScore = 0;
let computerScore = 0;
let gameCount = 0;

function playGame(playerChoice, computerChoice) {
    gameCount++;

   const result = playRound(playerChoice, computerChoice)

    resultDiv.textContent = result

    if (result.startsWith("You Win!")) {
        playerScore++;
        playerScoreDiv.textContent = `Player: ${playerScore}`
    } else if (result.startsWith("You Lose!")) {
        computerScore++;
        computerScoreDiv.textContent = `Computer: ${computerScore}`
    }

    if (gameCount < 5) return;

    if (playerScore > computerScore) {
        winnerDiv.textContent = "Player WON!"
    } else if (computerChoice > playerChoice) {
        winnerDiv.textContent = "Computer WON!"
    } else {
        winnerDiv.textContent = "It was a TIE! No Winner."
    }

    winnerModal.style.display = "flex"
    winnerModal.showModal()
}

rockBtn.addEventListener("click", () => {
    playGame("ROCK", getComputerChoice())
})

paperBtn.addEventListener("click", () => {
    playGame("PAPER", getComputerChoice())
})

scissorBtn.addEventListener("click", () => {
    playGame("SCISSOR", getComputerChoice())
})

closeModalBtn.addEventListener("click", () => {
    playerScore = 0
    computerScore = 0
    gameCount = 0

    playerScoreDiv.textContent = "Player: 0";
    computerScoreDiv.textContent = "Computer: 0"
    resultDiv.textContent = ""

    winnerModal.style.display = ""
    winnerModal.close()
})