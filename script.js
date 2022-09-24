// O is 1 or true,
// X is -1 or false
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
        displayController.displayPlayer1Win();
        document.querySelector(".reset").removeAttribute("disabled");
      } else if (row == -3 || col == -3) {
        displayController.displayPlayer2Win();
        document.querySelector(".reset").removeAttribute("disabled");
      }
    }
    //check for diagonals
    let diagonal1 =
      gameBoardData[0][0] + gameBoardData[1][1] + gameBoardData[2][2];
    let diagonal2 =
      gameBoardData[0][2] + gameBoardData[1][1] + gameBoardData[2][0];
    if (diagonal1 == 3 || diagonal2 == 3) {
      displayController.displayPlayer1Win();
      document.querySelector(".reset").removeAttribute("disabled");
    } else if (diagonal1 == -3 || diagonal2 == -3) {
      displayController.displayPlayer2Win();
      document.querySelector(".reset").removeAttribute("disabled");
    }

    // check for tie
    if (
      gameBoardData[0].indexOf(0) == -1 &&
      gameBoardData[1].indexOf(0) == -1 &&
      gameBoardData[2].indexOf(0) == -1
    ) {
      // FIXME: win and tie happening at the last cell
      displayController.displayTie();
      document.querySelector(".reset").removeAttribute("disabled");
    }
  };

  return { cells };
})();

const displayController = (function () {
  const displayReset = () => {
    gameBoard.cells.forEach((cell) => {
      cell.classList.remove("circle");
      cell.classList.remove("cross");
      location.reload(); // reload page
    });
  };

  // TODO:
  // capture player names via form and create player objects
  // on load have player enter name - all the time tho?

  const displayPlayer1Win = () => {
    document.querySelector(".final").innerText = "Player 1 wins!";
    document.getElementById("board").style.pointerEvents = "none";
  };

  const displayPlayer2Win = () => {
    document.querySelector(".final").innerText = "Player 2 wins!";
    document.getElementById("board").style.pointerEvents = "none";
  };

  const displayTie = () => {
    document.querySelector(".final").innerText = "It's a draw!";
    document.getElementById("board").style.pointerEvents = "none";
  };

  document.querySelector(".reset").addEventListener("click", displayReset);

  return { displayReset, displayPlayer1Win, displayPlayer2Win, displayTie };
})();

const Player = (name) => {
  return { name };
};

const trixie = Player(name);
const henry = Player(name);
