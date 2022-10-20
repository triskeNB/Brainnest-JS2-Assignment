// contains the computer options
const options = ["rock", "paper", "scissors"]; 
let winners = [];

function startGame() {
    // Play the game until someone wins 5 rounds
    let gameButtons = Array.from(document.querySelectorAll('button.btn-cyan'));
    gameButtons.forEach((btn) => 
        btn.addEventListener('click', () => {
            if(btn.id){
                playRound(btn.id);
            }
        })
    );
}


function resetGame() {
    winners = [];
    document.querySelector(".playerScore").textContent = "Score: 0";
    document.querySelector(".computerScore").textContent = "Score: 0";
    document.querySelector(".ties").textContent = "Ties: 0";
    document.querySelector(".winner").textContent = "";
    document.querySelector(".playerChoice").textContent = "";
    document.querySelector(".computerChoice").textContent = "";
    document.querySelector(".reset").style.display = "none";
}

function playRound(playerSelection) {
    let wins = checkResults();

    if(wins >= 5){
        return;
    }

    const computerSelection = computerPlay();

    const viewWinner = (pOption, cOption) => {
        if (pOption === cOption) {
            return "Tie";
        } else if (
            (pOption === "rock" && cOption == "scissors") ||
            (pOption === "paper" && cOption == "rock") ||
            (pOption === "scissors" && cOption == "paper")
        ) {
            return "Player";
        } else {
            return "Computer";
        }
    };

    const theWinner = viewWinner(playerSelection, computerSelection);
    
    winners.push(theWinner); // store every winner for each round played

    winsCount();
    roundResults(playerSelection, computerSelection, theWinner);

    wins = checkResults();

    if(wins == 5) {
        //display end results
        //change the button to visible,
        //change the text to display winner
        displayEnd();
    }
}

function computerPlay(){
    const choice = options[Math.floor(Math.random() * options.length)];

    document.querySelector(`.${choice}`).classList.add("active");

    setTimeout(() => {
      document.querySelector(`.${choice}`).classList.remove("active");
    }, 700);

    return choice;
}

function checkResults() {
    let playerWins = winners.filter((item) => item == "Player").length;
    let computerWins = winners.filter((item) => item == "Computer").length;
    return Math.max(playerWins, computerWins);   
}

// Displays the player/computer score
function winsCount(){
    let playerWins = winners.filter((item) => item == "Player").length;
    let computerWins = winners.filter((item) => item == "Computer").length;
    let ties = winners.filter((item) => item == "Tie").length;
    document.querySelector(".playerScore").textContent = `Score: ${playerWins}`;
    document.querySelector(".computerScore").textContent = `Score: ${computerWins}`;
    document.querySelector(".ties").textContent = `Ties: ${ties}`;
}

// Displays the final result if the player/computer won 5 rounds
function displayEnd(){
    let playerWins = winners.filter((item) => item == "Player").length;
    
    if (playerWins == 5) {
        document.querySelector(".winner").textContent =
          "You Won 5 Games, Congrats!";
    } else {
        document.querySelector(".winner").textContent =
          "Loser!!!, the computer won 5 times";
    }
    document.querySelector(".reset").style.display = "flex";
}

// Displays the computer/player option selected
function roundResults(playerSelection, computerSelection, theWinner) {
    document.querySelector(".playerChoice").textContent = `You Selected: ${
        playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)
    }`;
    document.querySelector(
        ".computerChoice"
    ).textContent = `The Computer Selected: ${
        computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1)
    }`;
    displayRoundWinner(theWinner);
}

// It shows the winner per round
function displayRoundWinner(theWinner){
    if (theWinner == "Player") {
        document.querySelector(".winner").textContent = "You won this Round!";
    } else if (theWinner == "Computer") {
        document.querySelector(".winner").textContent =
          "The Computer won this Round";
    } else {
        document.querySelector(".winner").textContent = "The Round was a tie";
    }
}

startGame(); 