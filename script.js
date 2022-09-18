// factory functions - functions that create an object without using the new keyword
// module pattern uses private and public methods/properties, return keyword, and IIFE
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module.
// If you need multiples of something (players!), create them with factories.

const gameBoard = (function (checkData) {
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
        console.log("check winning");
        // FIXME: Pass in checkData in here
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
    player *= -1; // change player

    player == 1 ? cell.classList.add("cross") : cell.classList.add("circle");

    console.log(gameBoardData);
  };

  return { gameBoardData };
})();

const displayController = (function (gameBoardData) {
  // check if win or draw
  const checkData = (gameBoardData) => {
    console.log("check the data");

    // show winning combinations
    // after each turn, always check against these
    // if there's a win or draw, call reset
  };

  const reset = () => {
    // do something
    console.log("reset the game");
  };

  return { reset, checkData };
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
