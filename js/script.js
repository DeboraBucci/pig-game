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

// STARTING CONDITIONS :
const scores = ["", 0, 0];
let playing, currentScore, activePlayer;

const init = function () {
  scores[1] = 0;
  scores[2] = 0;

  currentScore = 0;

  playing = true;

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
  const playerOnePromp = prompt("Player One Name :");
  const playerTwoPromp = prompt("Player Two Name :");

  document.querySelector("#name--1").textContent = playerOnePromp
    ? playerOnePromp
    : "Player One";
  document.querySelector("#name--2").textContent = playerTwoPromp
    ? playerTwoPromp
    : "Player Two";
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
