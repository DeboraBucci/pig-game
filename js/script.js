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
const scores = [0, 0];

let playing;
let currentScore = 0;
let activePlayer = 1;

// STARTING CONDITIONS :
scoreOne.textContent = 0;
scoreTwo.textContent = 0;
diceEl.classList.add("hidden");

// ROLLING DICE :
btnRoll.addEventListener("click", function () {
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
    // Delete Current Score :
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // Switch Players :
    activePlayer = activePlayer === 1 ? 2 : 1;

    playerOne.classList.toggle("player--active");
    playerTwo.classList.toggle("player--active");
  }
});
