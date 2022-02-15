import React, { useEffect } from "react";

import "./App.scss";
import Button from "../Button";
import GameParamsInput from "../GameParamsInput";
import { useGameDispatch, useGameSize } from "../../store/hooks";
import { GameSize, TICK } from "../../types";
import GameStatus from "../GameStatus";
import FlagsLeftDisplay from "../FlagsLeftDisplay/FlagsLeftDisplay";
import ElapsedTimeDisplay from "../ElapsedTimeDisplay/ElapsedTimeDisplay";

const App: React.FC = () => {
  const gameSize: GameSize = useGameSize();
  // const gameOver = useGameOver();
  const dispatch = useGameDispatch();

  useEffect(() => {
    dispatch({ type: TICK });
  },[])


  const renderCells = (): React.ReactNode => {
    return Array.from(Array(gameSize.rows).keys()).map(rowIndex => {
      return (
        <div className="row" key={`row-${rowIndex}`}>
          {Array.from(Array(gameSize.cols).keys()).map(colIndex => {
            return (
              <Button
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <div className="gameParams">
        <GameParamsInput />
      </div>
      <div className="Header">
      <FlagsLeftDisplay/>
        
        <GameStatus />
        <ElapsedTimeDisplay/>
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
