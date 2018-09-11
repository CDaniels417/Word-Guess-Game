var wordList = [
    "batman", "joker", "penguin", "catwoman", "robin", "alfred", "riddler",
    "bane", "scarecrow", "deadshot"
];

var tries = 9;                 //guesses left
var userGuesses = [];           //letters user guessed
var randomPick;                 //aray number chosen at ramdom
var guessedWord = "";           //word built to match current word 
var remainingGuesses = 0;       //guesses remaining
var gameFinished = false;       //flag for "press any key to try again"
var wins = 0;

// start game
function startGame() {
    remainingGuesses = tries;
    userGuesses = [];
    guessedWord = [];
    
    randomPick = Math.floor(Math.random() * wordList.length);

    //build word with blanks
    for (var i = 0 ; i < wordList[randomPick].length; i++) {
        guessedWord.push("_");
    }

    //clear win-image, gameover-image, pressTryAgain
    document.getElementById("win-image").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("pressTryAgain").style.cssText = "display: none";
    
    //refresh screen
    updatePage();
}

//  Updates the display on the HTML Page
function updatePage() {

    document.getElementById("totalWins").innerText = wins;

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessedWord.join(" ");
    document.getElementById("guessesLeft").innerText = remainingGuesses;
    document.getElementById("lettersGuessed").innerText = userGuesses;
}

//check letters entered to word user is guessing
function checkLetters(letter) {
    var lettersInWord = [];

    for (var i = 0; i < wordList[randomPick].length; i++) {
        if(wordList[randomPick][i] === letter) {
            lettersInWord.push(i);
        }
    }

    if(lettersInWord.length <= 0) {
        remainingGuesses--;
    } else {
        for(var j=0; j < lettersInWord.length; j++){
            guessedWord[lettersInWord[j]] = letter;
        }
    }
}

//verify all letters have been entered
function verifyWin() {
    if(guessedWord.indexOf("_") === -1) {
        document.getElementById("win-image").style.cssText = "display: block";
        document.getElementById("pressTryAgain").style.cssText = "display: block";
        wins++;
        gameFinished = true;
    }
}

function verifyLoss(){
    if(remainingGuesses <= -1) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressTryAgain").style.cssText = "display: block";
        gameFinished = true;
    }
}

function userInput(letter) {
    if(remainingGuesses > 0) {
        if(userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            letterInWord(letter);
        }
    }
}

//Event listener
document.onkeyup = function(event) {
    if(gameFinished) {
        startGame();
        gameFinished = false;
    } else { 
        userInput();
        updatePage();
        checkLetters();
        verifyWin();
        verifyLoss();
    }
}
