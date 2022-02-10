import React from "react";

import NumberDisplay from "../NumberDisplay";
// import { generateCells } from "../../utils";

import "./App.scss";
import Button from "../Button";
import GameParamsInput from "../GameParamsInput";
// import { DEFAULT_COLS, DEFAULT_ROWS, MIN_BOMBS } from "../../constants";
// import { GameSize } from "../../types";
import { GameContext, GameDispatchContext } from "../../context/gameContext";
import store from "../../store/store";

const App: React.FC = () => {
//   const [size, setSize] = useState<GameSize>({ cols: DEFAULT_COLS, rows: DEFAULT_ROWS, bombs: MIN_BOMBS });
//   const [cells] = useState(generateCells({ cols: DEFAULT_COLS, rows: DEFAULT_ROWS, bombs: MIN_BOMBS }));

//   function onChange(size: GameSize): void {
//     setSize(size);
//     setCells(generateCells(size));
//   }

//   const handleCellClickFactory = (rowIndex: number, colIndex: number) => {
//     return (): void => {
//       const newCells = cells.slice();

//       if (newCells[rowIndex][colIndex].state === CellState.open) {
//         newCells[rowIndex][colIndex].state = CellState.visible;
//       }
//       setCells(newCells);
//     };
//   };

  const renderCells = (): React.ReactNode => {
    return store.getState().board.map((row, rowIndex) => {
      console.log(`${rowIndex}`);
      return (
        <div className="row" key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => {
            console.log(`Row: ${rowIndex} Col: ${colIndex}`);

            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                // cell={cell}
                // onClick={handleCellClickFactory(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <GameContext.Provider value={store.getState()}>
      <GameDispatchContext.Provider value={store.dispatch}>
        <div className="App">
          <div className="gameParams">
            <GameParamsInput/>
          </div>
          <div className="Header">
            <NumberDisplay value={666} />
            <div className="Face">
              <span role="img" aria-label="face">
                😃
              </span>
            </div>
            <NumberDisplay value={42} />
          </div>
          
          <div className="Body">{renderCells()}</div>
        </div>
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};

export default App;
