import { useState } from "react";
import Miniboard from "./Miniboard";
import { checkCats, checkWinner, Cell, Player, MicroBoard, MacroBoard, MacroStatus, BoxStatus } from "./utils";

const makeEmptyMicroBoard = (): MicroBoard => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const makeEmptyMacroBoard = (): MacroBoard => [
  [makeEmptyMicroBoard(), makeEmptyMicroBoard(), makeEmptyMicroBoard()],
  [makeEmptyMicroBoard(), makeEmptyMicroBoard(), makeEmptyMicroBoard()],
  [makeEmptyMicroBoard(), makeEmptyMicroBoard(), makeEmptyMicroBoard()],
];

const makeEmptyMacroStatus = (): MacroStatus => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function App() {
  const [board, setBoard] = useState<MacroBoard>(makeEmptyMacroBoard);
  const [boxStatus, setBoxStatus] = useState<MacroStatus>(makeEmptyMacroStatus);
  const [playableBox, setPlayableBox] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "CATS" | null>(null);

  const resetGame = () => {
    setBoard(makeEmptyMacroBoard());
    setBoxStatus(makeEmptyMacroStatus());
    setPlayableBox(null);
    setCurrentPlayer("X");
    setWinner(null);
  };

  const play = (i: number, j: number, y: number, z: number) => {
    if (winner !== null) return;
    if (board[i][j][y][z] !== "") return;
    if (boxStatus[i][j] !== "") return;
    if (playableBox !== null && (playableBox[0] !== i || playableBox[1] !== j)) return;

    // Deep copy board and place the move
    const nextBoard: MacroBoard = board.map(row =>
      row.map(grid =>
        grid.map(r => [...r] as [Cell, Cell, Cell]) as MicroBoard
      ) as [MicroBoard, MicroBoard, MicroBoard]
    ) as MacroBoard;
    nextBoard[i][j][y][z] = currentPlayer;

    // Compute new box status for the just-played mini-grid
    const nextBoxStatus: MacroStatus = boxStatus.map(
      row => [...row] as [BoxStatus, BoxStatus, BoxStatus]
    ) as MacroStatus;

    if (checkWinner(nextBoard[i][j])) {
      nextBoxStatus[i][j] = currentPlayer;
    } else if (checkCats(nextBoard[i][j])) {
      nextBoxStatus[i][j] = "CATS";
    }

    // The cell played at (y, z) sends the next player to mini-grid (y, z)
    const nextPlayable: [number, number] | null =
      nextBoxStatus[y][z] !== "" ? null : [y, z];

    if (checkWinner(nextBoxStatus)) {
      setWinner(currentPlayer);
    } else if (checkCats(nextBoxStatus)) {
      setWinner("CATS");
    }

    setBoard(nextBoard);
    setBoxStatus(nextBoxStatus);
    setPlayableBox(nextPlayable);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <>
      <div className="header">
        <h1>TIC TAC TOE</h1>
        <h2>Ultimate</h2>
      </div>
      <div className="app-wrapper">
        {winner !== null ? (
          <div className="gameover">
            <p>{winner === "CATS" ? "It's a draw!" : `${winner} wins!`}</p>
            <button className="modal-button" onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <p className="current-player">{currentPlayer}&apos;s turn</p>
        )}
        <table className="outer-table">
          <tbody>
            {board.map((row, i) => (
              <tr key={`row-${i}`}>
                {row.map((grid, j) => (
                  <td className="outer-td" key={`cell-${i}${j}`}>
                    <Miniboard
                      playableBox={playableBox}
                      status={boxStatus[i][j]}
                      grid={grid}
                      i={i}
                      j={j}
                      play={play}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {winner === null && (
          <button className="modal-button" onClick={resetGame}>Reset</button>
        )}
      </div>
    </>
  );
}

export default App;
