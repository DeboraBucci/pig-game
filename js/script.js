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

// VARIABLES :
const scores = ["", 0, 0];

let playing = true;
let currentScore = 0;
let activePlayer = 1;

// STARTING CONDITIONS :
scoreOne.textContent = 0;
scoreTwo.textContent = 0;
diceEl.classList.add("hidden");

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

      playing = false;
    } else {
      // Switch Players
      switchPlayers();
    }
  }
});
