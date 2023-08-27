/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Miniboard from "./Miniboard";
// import Modal from 'react-modal';
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

// const customStyles = {
//   content: {
//     top: '20%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

function App() {
  const [state, setState] = React.useState(initState);
  const [boxStatus, setBoxStatus] = React.useState(initBoxStatus);
  const [playableBox, setPlayableBox] = React.useState<any[]>([]);
  const [currentPlay, setCurrentPlay] = React.useState("X");
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  const updatePlayable = (y:number, z:number) => {
    if (boxStatus[y][z] !== "") {
      setPlayableBox([]);
    } else {
      setPlayableBox([y, z]);
    }
  };

  const play = (i: number, j: number, y: number, z: number) => {
    if(state[i][j][y][z] === "") {
      setState((prev) => {
        prev[i][j][y][z] = currentPlay;
        updatePlayable(y, z);
        if (checkWinner(prev[i][j])) {
          setPlayableBox([]);
          setBoxStatus((prev) => {
            prev[i][j] = currentPlay;
            const gameOver = checkWinner(prev) || checkCats(prev);
            if(gameOver) {
              // openModal()
              alert("GAME WON REFRESH TO PLAY AGAIN")
            }
            return prev;
          });
        }
        if(checkCats(prev[i][j])) {
          setPlayableBox([]);
          setBoxStatus(prev => {
            prev[i][j] = "CATS";
            return prev;
          })
        }
        return prev;
      });
      setCurrentPlay(currentPlay === "X" ? "O" : "X");
    } 
  };

  // function openModal() {
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }

  return (
    <>
    <div className="app-wrapper">
      <div className="outer-grid-wrapper">
        {state.map((row, i) =>
          row.map((grid, j) => (
            <div key={`box-${i}${j}`}>
              <Miniboard
                playableBox={playableBox}
                status={boxStatus[i][j]}
                grid={grid}
                i={i}
                j={j}
                play={play}
              />
            </div>
          ))
        )}
      </div>
    </div>
    {/* <div style={{zIndex: "50"}}>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="wrapper-modal">
          <div className="gameover">
            GAME OVER!
          </div>
          <button className="modal-button" onClick={() => location.reload()}>Play again</button>
        </div>
      </Modal>
    </div> */}
    </>
  );
}

export default App;
