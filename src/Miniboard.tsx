/* eslint-disable @typescript-eslint/no-explicit-any */
const Miniboard = (props: any) => {
  const boxName = (box: string) => {
    if (box === "X") return "x";
    if (box === "O") return "o";
    return "box";
  };

  const outerBox = () => {
    if (!props.playableBox.length || props.status != "") return "outer-box";
    const [propI, propJ] = props.playableBox;
    if (props.i !== propI || props.j !== propJ) return "outer-box dimmed";
    return "outer-box";
  };

  return (
    <div className={outerBox()}>
      {props.status != "" ? (
        <div
          className={
            props.status === "X"
              ? "done-x"
              : props.status === "O"
              ? "done-o"
              : "done-cats"
          }
        >
          {props.status}
        </div>
      ) : (
        <div className="grid-wrapper">
          {props.grid.map((row: any[], y: number) =>
            row.map((box: string, z: number) => (
              <div
                key={`grid-${y}${z}`}
                className={boxName(box)}
                onClick={() => props.play(props.i, props.j, y, z)}
              >
                {box}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Miniboard;
