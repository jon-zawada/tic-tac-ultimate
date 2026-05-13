export type Player = "X" | "O";
export type Cell = Player | "";
export type BoxStatus = Player | "CATS" | "";

export type MicroBoard = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]];
export type MacroStatus = [[BoxStatus, BoxStatus, BoxStatus], [BoxStatus, BoxStatus, BoxStatus], [BoxStatus, BoxStatus, BoxStatus]];
export type MacroBoard = [[MicroBoard, MicroBoard, MicroBoard], [MicroBoard, MicroBoard, MicroBoard], [MicroBoard, MicroBoard, MicroBoard]];

const lineWon = (a: string, b: string, c: string): boolean =>
  a !== "" && a !== "CATS" && a === b && a === c;

export const checkWinner = (board: string[][]): boolean => {
  for (let i = 0; i < 3; i++) {
    if (lineWon(board[i][0], board[i][1], board[i][2])) return true;
    if (lineWon(board[0][i], board[1][i], board[2][i])) return true;
  }
  return (
    lineWon(board[0][0], board[1][1], board[2][2]) ||
    lineWon(board[2][0], board[1][1], board[0][2])
  );
};

export const checkCats = (board: string[][]): boolean => {
  for (const row of board) {
    for (const cell of row) {
      if (cell === "") return false;
    }
  }
  return true;
};
