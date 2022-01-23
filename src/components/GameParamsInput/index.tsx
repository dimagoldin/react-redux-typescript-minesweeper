import React, { useState, FormEvent } from "react";
import { DEFAULT_ROWS, DEFAULT_COLS } from "../../constants";
import { GameSize } from "../../types";

interface GameParamInputProps {
  size: GameSize;
  setSize: any;
}

const GameParamsInput: React.FC<GameParamInputProps> = (props) => {
  let size: GameSize = { ...props.size};

  function onChange(e: FormEvent<HTMLInputElement>): void {
    const updatedSize: GameSize = {
      ...size,
    };
    if (e.currentTarget.name === 'numberOfRows') {
      let rows: number = Number(e.currentTarget.value);
      updatedSize.rows = rows;
    }
    if (e.currentTarget.name === 'numberOfCols') {
      let cols: number = Number(e.currentTarget.value);
      updatedSize.cols = cols;
    }
    if (e.currentTarget.name === 'numberOfBombs') {
      let bombs: number = Number(e.currentTarget.value);
      updatedSize.bombs = bombs;
    }
    props.setSize(updatedSize)
  }

  return <form>
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
}

export default GameParamsInput;