import React, { useState } from "react";
import classes from "./tictactoe.module.css";

const TicTacToe = () => {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [win, setWin] = useState([false, false]);
  const [selectedWords, setSelectedWords] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [fullyFilled, setFullyFilled] = useState(false);

  const handleCellClick = (index) => {
    if (selectedWords[index]) {
      return;
    }
    const newSelectedWords = [...selectedWords];
    newSelectedWords[index] = `${currentPlayer === 1 ? "X" : "O"}`;
    setSelectedWords(newSelectedWords);
    const newGrid = [...grid];
    newGrid[index] = currentPlayer;
    setGrid(newGrid);
    if (checkForWin(newSelectedWords)) {
      let temp = [...win];
      temp[currentPlayer - 1] = true;
      setWin(temp);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
    checkFullyFilled(newSelectedWords);
  };

  const checkFullyFilled = (grid) => {
    debugger
    const nonEmpty = grid.filter((ele) => ele !== "")
    nonEmpty.length === 9 ? setFullyFilled(true) : setFullyFilled(false);
  }

  const checkForWin = (newSelectedWords) => {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        newSelectedWords[i] &&
        newSelectedWords[i] === newSelectedWords[i + 1] &&
        newSelectedWords[i] === newSelectedWords[i + 2]
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        newSelectedWords[i] &&
        newSelectedWords[i] === newSelectedWords[i + 3] &&
        newSelectedWords[i] === newSelectedWords[i + 6]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      newSelectedWords[0] &&
      newSelectedWords[0] === newSelectedWords[4] &&
      newSelectedWords[0] === newSelectedWords[8]
    ) {
      return true;
    }
    if (
      newSelectedWords[2] &&
      newSelectedWords[2] === newSelectedWords[4] &&
      newSelectedWords[2] === newSelectedWords[6]
    ) {
      return true;
    }

    return false;
  };

  const resetGame = () => {
    setGrid(Array(9).fill(""));
    setSelectedWords(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer(1);
    setWin([false, false]);
    setFullyFilled(false)
  };

  return (
    <div className={classes.container}>
      <div className={classes.turn}>
        <div
          className={`${classes.player} ${
            currentPlayer === 1 && classes.active
          }`}
        >
          {" "}
          X{" "}
        </div>
        <div
          className={`${classes.player} ${
            currentPlayer === 2 && classes.active
          }`}
        >
          {" "}
          O{" "}
        </div>
      </div>
      <div className={classes.board}>
        {grid.map((cell, index) => (
          <div
            key={index}
            className={`${classes.cell} ${selectedWords[index]} ${
              (win[0] || win[1] || fullyFilled) &&
              classes.disableGame
            }`}
            onClick={() => handleCellClick(index)}
          >
            <div
              className={
                selectedWords[index] === "X" ? classes.Xcell : classes.Ocell
              }
            >
              {selectedWords[index]}
            </div>
          </div>
        ))}
      </div>
      <br />
      {win[0] && <div className={classes.Xcell}>Player 1 wins!</div>}
      {win[1] && <div className={classes.Ocell}>Player 2 wins!</div>}
      {!win[0] && !win[1] && fullyFilled && <div>Match Drawn!</div>}
      {(win[0] || win[1] || fullyFilled) && (
        <button onClick={resetGame}>Reset</button>
      )}
    </div>
  );
};

export default TicTacToe;
