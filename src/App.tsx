/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Miniboard from "./Miniboard";
import { Container, Col, Button } from "react-bootstrap";
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

  const resetGame = () => {
    setState(initState); //this doesnt work
    setBoxStatus(initBoxStatus);
    setPlayableBox([]);
    setCurrentPlay("X");
  };

  return (
    <>
      <div className="header">
        <h1>TIC TAC TOE</h1>
        <h2>Ultimate</h2>
      </div>
      <Container fluid className="app-wrapper">
        <Container className="outer-grid-wrapper">
          {state.map((row, i) =>
            row.map((grid, j) => (
              <Col key={`box-${i}${j}`}>
                <Miniboard
                  playableBox={playableBox}
                  status={boxStatus[i][j]}
                  grid={grid}
                  i={i}
                  j={j}
                  play={play}
                />
              </Col>
            ))
          )}
        </Container>
        {/* <Button variant="primary" size="lg" onClick={resetGame}>
          Restart game
        </Button> */}
      </Container>
    </>
  );
}

export default App;
