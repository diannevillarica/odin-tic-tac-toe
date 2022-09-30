// O is 1 or true,
// X is -1 or false
"use strict";

// Factory Function
const Player = (name) => {
  const getShitDone = () => {
    console.log("I can do things too!");
  };
  return { name, getShitDone };
};

// Module IIFE
const gameBoard = (function () {
  let _gameBoardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]; // stores selections for the entire game

  const cells = document.querySelectorAll("[data-cell]");
  let _player = 1;

  cells.forEach((cell, index) => {
    cell.addEventListener(
      "click",
      () => {
        _placeData(index);
        _checkData();
      },
      { once: true }
    );
  });

  const _placeData = (index) => {
    let _cell = event.target;
    let _col = index % 3;
    let _row = (index - _col) / 3;

    _gameBoardData[_row][_col] = _player;
    _player *= -1; // switch player
    _player == 1 ? _cell.classList.add("cross") : _cell.classList.add("circle"); // placeMarker
  };

  // check if win or draw
  const _checkData = () => {
    //check for _rows/_columns
    let _row, _col, _dia1, _dia2;
    for (let i = 0; i < 3; i++) {
      _row = _gameBoardData[i][0] + _gameBoardData[i][1] + _gameBoardData[i][2];
      _col = _gameBoardData[0][i] + _gameBoardData[1][i] + _gameBoardData[2][i];
      if (_row == 3 || _col == 3) {
        displayController.displayPlayer1Win();
        document.querySelector(".button-reset").removeAttribute("disabled");
      } else if (_row == -3 || _col == -3) {
        displayController.displayPlayer2Win();
        document.querySelector(".button-reset").removeAttribute("disabled");
      }
    }
    //check for diagonals
    _dia1 = _gameBoardData[0][0] + _gameBoardData[1][1] + _gameBoardData[2][2];
    _dia2 = _gameBoardData[0][2] + _gameBoardData[1][1] + _gameBoardData[2][0];
    if (_dia1 == 3 || _dia2 == 3) {
      displayController.displayPlayer1Win();
      document.querySelector(".button-reset").removeAttribute("disabled");
    } else if (_dia1 == -3 || _dia2 == -3) {
      displayController.displayPlayer2Win();
      document.querySelector(".button-reset").removeAttribute("disabled");
    }

    // check for tie
    if (
      _gameBoardData[0].indexOf(0) == -1 &&
      _gameBoardData[1].indexOf(0) == -1 &&
      _gameBoardData[2].indexOf(0) == -1 &&
      (_row || _col || _dia1 || _dia2) == -1
    ) {
      // FIXME: win and tie happening at the last cell
      displayController.displayTie();
      document.querySelector(".button-reset").removeAttribute("disabled");
    }
  };

  return { cells };
})();

// Module IIFE
const displayController = (function () {
  const createPlayer = () => {
    // console.log(event.target.value);
    let _player1 = Player(
      document.getElementsByTagName("input")[0].value || "Player 1"
    );
    let _player2 = Player(
      document.getElementsByTagName("input")[1].value || "Player 2"
    );
    return { _player1, _player2 };
  };

  const displayPlayer1Win = () => {
    document.querySelector(".final").innerText = `${
      displayController.createPlayer()._player1.name
    } wins!`; // Player 1 wins!
    document.getElementById("board").style.pointerEvents = "none";
  };

  const displayPlayer2Win = () => {
    document.querySelector(".final").innerText = `${
      displayController.createPlayer()._player2.name
    } wins!`;
    document.getElementById("board").style.pointerEvents = "none";
  };

  const displayTie = () => {
    document.querySelector(".final").innerText = "It's a draw!";
    document.getElementById("board").style.pointerEvents = "none";
  };

  const displayReset = () => {
    gameBoard.cells.forEach((cell) => {
      cell.classList.remove("circle");
      cell.classList.remove("cross");
      location.reload(); // reload page
    });
  };

  document
    .querySelector(".button-reset")
    .addEventListener("click", displayReset);

  const _inputs = document.querySelectorAll("input");
  _inputs.forEach((input) => {
    input.addEventListener("input", createPlayer);
  });

  return {
    displayReset,
    displayPlayer1Win,
    displayPlayer2Win,
    displayTie,
    createPlayer,
  };
})();

// how about using the button to start the game them instanciate the player names then
// after the game the text will change within the button :)
// still need to fix the bug in the last part of the cell

// after solving this do the other hw ok!
