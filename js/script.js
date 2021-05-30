"use strict";

// SELECTING ELEMENTS
const playerOne = document.querySelector(".player--1");
const playerTwo = document.querySelector(".player--2");

const scoreOne = document.getElementById("score--1");
const scoreTwo = document.getElementById("score--2");

const currentOne = document.getElementById("current--1");
const currentTwo = document.getElementById("current--2");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const startBtn = document.querySelector(".start");

const easy = document.querySelector(".btn-1");
const medium = document.querySelector(".btn-2");
const hard = document.querySelector(".btn-3");

const returnBtn = document.querySelector("#return");

const rulesBtn = document.querySelector("#rules");
const creditsBtn = document.querySelector("#credits");

const btnsRules = document.querySelectorAll(".diff");
const clAll = document.querySelectorAll(".rules");
const playBtns = document.querySelectorAll(".play");

const closeRules = document.querySelectorAll(".close");

const title = document.querySelector(".title");

const scores = ["", 0, 0];
let playing, currentScore, activePlayer;

// HIDE OR SHOW :
const hideShow = function () {
  easy.classList.toggle("hide");
  medium.classList.toggle("hide");
  hard.classList.toggle("hide");

  returnBtn.classList.toggle("hide");

  document.querySelector("#rules").classList.toggle("hide");
  document.querySelector("#credits").classList.toggle("hide");
};

// START BUTTON
document.querySelector(".start").addEventListener("click", function () {
  hideShow();
  startBtn.classList.add(".btn--no");
});

// RETURN BUTTON :
document.querySelector("#return").addEventListener("click", hideShow);

// OPEN EVERY RULE :
for (let i = 0; i < btnsRules.length; i++) {
  const ruleName = btnsRules[i].textContent.toLowerCase().trim();

  btnsRules[i].addEventListener("click", function () {
    document.querySelector(`.${ruleName}-rules`).classList.remove("hide");

    medium.classList.add("hide");
    hard.classList.add("hide");
    easy.classList.add("hide");
    startBtn.classList.add("hide");
    returnBtn.classList.add("hide");

    title.textContent = `${
      ruleName[0].toUpperCase() + ruleName.slice(1) + " Gameplay"
    }`;
  });
}

// CLOSE EVERY RULE :
for (let x = 0; x < closeRules.length; x++) {
  closeRules[x].addEventListener("click", function () {
    for (let y = 0; y < clAll.length; y++) {
      clAll[y].classList.add("hide");
    }

    medium.classList.remove("hide");
    hard.classList.remove("hide");
    easy.classList.remove("hide");
    startBtn.classList.remove("hide");
    returnBtn.classList.remove("hide");

    document.querySelector(".title").textContent = "WELCOME TO PIGGY GAME!";
  });
}

// PLAY
for (let p = 0; p < playBtns.length; p++) {
  playBtns[p].addEventListener("click", function () {
    playing = true;

    document.querySelector(".header").classList.add("hide");

    playerOne.classList.remove("none--display");
    playerTwo.classList.remove("none--display");

    btnNew.classList.remove("none--display");
    btnHold.classList.remove("none--display");
    btnRoll.classList.remove("none--display");
  });
}

// GAME FUNCTIONALITY
//////////////////////////////////////////////////////////////////////////////////////

// STARTING CONDITIONS :

const init = function () {
  scores[1] = 0;
  scores[2] = 0;

  currentScore = 0;

  activePlayer = 1;

  // SCORES BACK TO CERO :
  scoreOne.textContent = 0;
  scoreTwo.textContent = 0;

  currentOne.textContent = 0;
  currentTwo.textContent = 0;

  // HIDDEN DICE :
  diceEl.classList.add("hidden");

  // REMOVE WINNER FEATURES :
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");

  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");

  btnHold.classList.remove("buttons--winner");
  btnRoll.classList.remove("buttons--winner");

  btnRoll.classList.add("btn");
  btnHold.classList.add("btn");
};
init();

// PLAYERS NAME :
const newNames = function () {
  if (playing) {
    const playerOnePromp = prompt("Player One Name :");
    const playerTwoPromp = prompt("Player Two Name :");

    document.querySelector("#name--1").textContent = playerOnePromp
      ? playerOnePromp
      : "Player One";
    document.querySelector("#name--2").textContent = playerTwoPromp
      ? playerTwoPromp
      : "Player Two";
  }
};
newNames();

// SWITCH PLAYERS FUNCTION :
const switchPlayers = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 1 ? 2 : 1;

  playerOne.classList.toggle("player--active");
  playerTwo.classList.toggle("player--active");
};

// ROLLING DICE :
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate random number between 1 and 6 :
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // Display Dice :
    diceEl.classList.remove("hidden");
    diceEl.src = `/images/dice-${dice}.png`;

    // CHeck if diceNum === 1 :
    if (dice !== 1) {
      // Add to current score :
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Players :
      switchPlayers();
    }
  }
});

// HOLD SCORE :
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player's score :
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100;
    if (scores[activePlayer] >= 20) {
      // Finish Game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      btnHold.classList.add("buttons--winner");
      btnRoll.classList.add("buttons--winner");

      btnRoll.classList.remove("btn");
      btnHold.classList.remove("btn");

      diceEl.classList.add("hidden");

      playing = false;
    } else {
      // Switch Players
      switchPlayers();
    }
  }
});

// NEW GAME :
btnNew.addEventListener("click", function () {
  // PROMPT "WANT TO KEEP NAMES?"
  const keepNames = prompt(
    "WANT TO KEEP NAMES?\n Y/yes to keep them."
  ).toUpperCase();

  const i = keepNames.includes("Y") || keepNames.includes("YES") ? true : false;

  // IF i FALSE, THEN NEW NAMES FUNCTION STARTS :
  if (!i) {
    newNames();
  }

  init();
});
