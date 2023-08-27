/* eslint-disable @typescript-eslint/no-explicit-any */
export const rowChecker = (board: any[]) => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] !== "" &&
      board[i][1] !== "" &&
      board[i][2] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }
  return false;
};

export const colChecker = (board: any[]) => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[0][i] !== "" &&
      board[1][i] !== "" &&
      board[2][i] !== "" &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i] &&
      board[1][i] === board[2][i]
    ) {
      return true;
    }
  }
  return false;
};

export const diagonalChecker = (board: any[]) => {
  if (
    (board[0][0] !== "" &&
      board[1][1] !== "" &&
      board[2][2] !== "" &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[1][1] === board[2][2]) ||
    (board[2][0] !== "" &&
      board[1][1] !== "" &&
      board[0][2] !== "" &&
      board[2][0] === board[1][1] &&
      board[2][0] === board[0][2] &&
      board[1][1] === board[0][2])
  ) {
    return true;
  }
  return false;
};

export const checkWinner = (board: any[]) => {
  return rowChecker(board) || colChecker(board) || diagonalChecker(board);
};

export const checkCats = (board: any[]) => {
  for (const row of board) {
    for (const col of row) {
      if (col === "") return false;
    }
  }
  return true;
};
