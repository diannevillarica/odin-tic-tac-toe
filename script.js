// factory functions - functions that create an object without using the new keyword
// module pattern uses private and public methods/properties, return keyword, and IIFE
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module.
// If you need multiples of something (players!), create them with factories.
// X is 1 or true,
// O is -1 or false
"use strict";

const gameBoard = (function () {
  let gameBoardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]; // stores selections for the entire game

  const cells = document.querySelectorAll("[data-cell]");
  let player = 1;

  cells.forEach((cell, index) => {
    cell.addEventListener(
      "click",
      () => {
        placeData(index);
        checkData();
      },
      { once: true }
    );
  });

  const placeData = (index) => {
    let cell = event.target;
    let col = index % 3;
    let row = (index - col) / 3;

    gameBoardData[row][col] = player;
    player *= -1; // switch player
    player == 1 ? cell.classList.add("cross") : cell.classList.add("circle"); // placeMarker
  };

  // check if win or draw
  const checkData = () => {
    //check for rows/columns
    for (let i = 0; i < 3; i++) {
      let row = gameBoardData[i][0] + gameBoardData[i][1] + gameBoardData[i][2];
      let col = gameBoardData[0][i] + gameBoardData[1][i] + gameBoardData[2][i];
      if (row == 3 || col == 3) {
        console.log("player 1 wins");
        displayController.reset();
      } else if (row == -3 || col == -3) {
        console.log("player 2 wins");
        displayController.reset();
      }
    }
    //check for diagonals
    let diagonal1 =
      gameBoardData[0][0] + gameBoardData[1][1] + gameBoardData[2][2];
    let diagonal2 =
      gameBoardData[0][2] + gameBoardData[1][1] + gameBoardData[2][0];
    if (diagonal1 == 3 || diagonal2 == 3) {
      console.log("player 1 wins");
      displayController.reset();
    } else if (diagonal1 == -3 || diagonal2 == -3) {
      console.log("player 2 wins");
      displayController.reset();
    }

    // check for tie
    if (
      gameBoardData[0].indexOf(0) == -1 &&
      gameBoardData[1].indexOf(0) == -1 &&
      gameBoardData[2].indexOf(0) == -1
    ) {
      // FIXME: win and tie happening at the last cell
      console.log("tie");
      displayController.reset();
    }
  };

  return { gameBoardData };
})();

const displayController = (function () {
  const reset = () => {
    console.log("reset the game");
    const cells = document.querySelectorAll("[data-cell]");
    cells.forEach((cell) => {
      cell.classList.remove("circle");
      cell.classList.remove("cross");
      // FIXME: remove once prop
      cell.removeEventListener("click");
    });
    gameBoard.gameBoardData = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };

  document.querySelector(".reset").addEventListener("click", reset);

  return { reset };
})();

const Player = (playerNumber, playerMarker) => {
  // do something with that selection
  // return that selection
  return { playerNumber, playerMarker };
};

const trixie = Player(1, "cross");
const henry = Player(2, "circle");

// tic tac toe concept
// reset game
// player clicks on a tile , their class gets recorded
// check for win or draw - check curr arr against winning combinations
// if win or draw
// do step 1
// if not
// do step 2
