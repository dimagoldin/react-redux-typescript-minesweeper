import React, { FormEvent } from "react";
import { useGameDispatch, useGameSize } from "../../store/hooks";
import { GameSize, NEW_GAME } from "../../types";

// interface GameParamInputProps {
//   size: GameSize;
//   setSize: any;
// }

const GameParamsInput: React.FC = () => {
  const size: GameSize = useGameSize();
  const dispatch = useGameDispatch();

  function onChange(e: FormEvent<HTMLInputElement>): void {
    const updatedSize: GameSize = {
      ...size,
    };
    if (e.currentTarget.name === "numberOfRows") {
      const rows: number = Number(e.currentTarget.value);
      updatedSize.rows = rows;
    }
    if (e.currentTarget.name === "numberOfCols") {
      const cols: number = Number(e.currentTarget.value);
      updatedSize.cols = cols;
    }
    if (e.currentTarget.name === "numberOfBombs") {
      const bombs: number = Number(e.currentTarget.value);

      updatedSize.bombs = bombs;
    }
    dispatch({ type: NEW_GAME, size: updatedSize });
    // props.setSize(updatedSize)
  }

  return (
    <form>
      <label>
        Rows:
        <input
          max={30}
          min={8}
          className="input"
          name="numberOfRows"
          type="number"
          value={size.rows}
          onChange={onChange}
        />
      </label>
      <br />
      <label>
        Columns:
        <input
          max={30}
          min={8}
          className="input"
          name="numberOfCols"
          type="number"
          value={size.cols}
          onChange={onChange}
        />
      </label>
      <br />
      <label>
        Bombs:
        <input
          max={40}
          min={10}
          className="input"
          name="numberOfBombs"
          type="number"
          value={size.bombs}
          onChange={onChange}
        />
      </label>
    </form>
  );
};

export default GameParamsInput;
