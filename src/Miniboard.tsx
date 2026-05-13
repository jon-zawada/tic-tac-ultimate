import { BoxStatus, Cell, MicroBoard } from "./utils";

interface MiniboardProps {
  playableBox: [number, number] | null;
  status: BoxStatus;
  grid: MicroBoard;
  i: number;
  j: number;
  play: (i: number, j: number, y: number, z: number) => void;
}

const Miniboard = ({ playableBox, status, grid, i, j, play }: MiniboardProps) => {
  const cellClass = (cell: Cell): string => {
    if (cell === "X") return "x";
    if (cell === "O") return "o";
    return "box";
  };

  const outerClass = (): string => {
    if (playableBox === null || status !== "") return "outer-box";
    const [pi, pj] = playableBox;
    if (i !== pi || j !== pj) return "outer-box dimmed";
    return "outer-box";
  };

  const doneClass = (): string => {
    if (status === "X") return "done-x";
    if (status === "O") return "done-o";
    return "done-cats";
  };

  return (
    <div className={outerClass()}>
      {status !== "" ? (
        <div className={doneClass()}>{status}</div>
      ) : (
        <div className="grid-wrapper">
          {grid.map((row, y) =>
            row.map((cell, z) => (
              <div
                key={`grid-${y}${z}`}
                className={cellClass(cell)}
                onClick={() => play(i, j, y, z)}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Miniboard;
