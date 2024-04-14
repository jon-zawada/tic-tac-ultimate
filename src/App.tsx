/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Miniboard from "./Miniboard";
import { checkCats, checkWinner } from "./utils";

const initState = [
  [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ],
  [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ],
  [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ],
];

const initBoxStatus = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function App() {
  const [state, setState] = React.useState(initState);
  const [boxStatus, setBoxStatus] = React.useState(initBoxStatus);
  const [playableBox, setPlayableBox] = React.useState<any[]>([]);
  const [currentPlay, setCurrentPlay] = React.useState("X");

  const updatePlayable = (y: number, z: number) => {
    if (boxStatus[y][z] !== "") {
      setPlayableBox([]);
    } else {
      setPlayableBox([y, z]);
    }
  };

  const play = (i: number, j: number, y: number, z: number) => {
    if (state[i][j][y][z] === "") {
      setState((prev) => {
        prev[i][j][y][z] = currentPlay;
        updatePlayable(y, z);
        if (checkWinner(prev[i][j])) {
          setPlayableBox([]);
          setBoxStatus((prev) => {
            prev[i][j] = currentPlay;
            const gameOver = checkWinner(prev) || checkCats(prev);
            if (gameOver) {
              alert("GAME WON REFRESH TO PLAY AGAIN");
            }
            return prev;
          });
        }
        if (checkCats(prev[i][j])) {
          setPlayableBox([]);
          setBoxStatus((prev) => {
            prev[i][j] = "CATS";
            return prev;
          });
        }
        return prev;
      });
      setCurrentPlay(currentPlay === "X" ? "O" : "X");
    }
  };

  // const resetGame = () => {
  //   setState(initState); //this doesnt work
  //   setBoxStatus(initBoxStatus);
  //   setPlayableBox([]);
  //   setCurrentPlay("X");
  // };

  return (
    <>
      <div className="header">
        <h1>TIC TAC TOE</h1>
        <h2>Ultimate</h2>
      </div>
      <div className="app-wrapper">
        <table className="outer-table">
          <tbody>
            {state.map((row, i) => (
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
      </div>
    </>
  );
}

export default App;
