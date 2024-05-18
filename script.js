const ROCK = { 
    rawValue: 0,
    imgPath: "assets/rock.png"
}

const PAPER = { 
    rawValue: 1,
    imgPath: "assets/paper.png"
}

const SCRISSORS = {
    rawValue: 2,
    imgPath: "assets/scrissors.png"
}

const WIN = 0;
const LOSE = 1;
const TIE = 2;

let userScore = 0;
let computerScore = 0;

function userHand() {
    return document.getElementById("user-choice");
}

function computerHand() { 
    return document.getElementById("computer-choice"); 
}

async function userDidSelect(choice) { 
    await startGame(choice);
}

function getComputersChoice() {
    return Math.floor(Math.random() * 3)
}

async function startGame(userChoice) {
    resetImages();
    const computerChoice = getComputersChoice();
    const gameResult = getGameResult(userChoice, computerChoice);
    await animateShake();
    setChoiceImages(userChoice, computerChoice)
    updateScoreBoard(gameResult);
}

async function animateShake() {
    const animationDuration = 3000;

    userHand().style.animation = "userAnimation 1s infinite";
    computerHand().style.animation = "computerAnimation 1s infinite";

    await sleep(animationDuration);

    userHand().style.animation = null;
    computerHand().style.animation = null;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getGameResult(userChoice, computerChoice) { 
    if (userChoice === computerChoice) {
        return TIE;
    }

    if (userChoice === ROCK.rawValue) {
        if (computerChoice === PAPER.rawValue) {
            return LOSE;
        }

        return WIN;
    } else if (userChoice === PAPER.rawValue) {
        if (computerChoice === ROCK.rawValue) {
            return WIN;
        }

        return LOSE;
    } else if (userChoice === SCRISSORS.rawValue) {
        if (computerChoice === ROCK.rawValue) {
            return LOSE;
        }

        return WIN;
    }
}

function setChoiceImages(userChoice, computerChoice) { 
    const choices = [ROCK, PAPER, SCRISSORS];
    userHand().src = choices.find((choice) => choice.rawValue === userChoice).imgPath;
    computerHand().src = choices.find((choice) => choice.rawValue === computerChoice).imgPath;

    if (userChoice === SCRISSORS.rawValue) {
        userHand().style.transform = "rotate(90deg) scaleX(1)"
    }
    
    if (computerChoice == SCRISSORS.rawValue) {
        computerHand().style.transform = "rotate(-90deg) scaleX(-1)"
    }
}

function resetImages() {
    userHand().src = "assets/rock.png"
    computerHand().src = "assets/rock.png"
    userHand().style.transform = "rotate(90deg) scaleX(-1)";
    computerHand().style.transform = "rotate(-90deg)";
}

function updateScoreBoard(gameResult) { 
    if (gameResult === WIN) {
        userScore += 1;
    } else if (gameResult === LOSE) {
        computerScore += 1;
    }
    
    document.getElementById("score").innerText = `${userScore} - ${computerScore}`;
}