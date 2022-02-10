import React, { useCallback } from "react";
import { useCellData, useGameDispatchContext } from "../../context/gameContext";
import { Cell, CellState, CellValue, OPEN_CELL, FLAG_CELL } from "../../types";

import "./Button.scss";

interface CellButtonProps {
  //   cell: Cell;
  colIndex: number;
  rowIndex: number;
  //   onClick(): void;
}

const Button: React.FC<CellButtonProps> = ({ rowIndex, colIndex }) => {
  const cell: Cell = useCellData(rowIndex, colIndex);
  const dispatch = useGameDispatchContext();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
    },
    [cell.state, dispatch],
  );

  const onRightClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex });
    },
    [cell.state, dispatch],
  );

  const renderContent = (): React.ReactNode => {
    if (cell.state === CellState.visible) {
      if (cell.value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      }
      if (cell.value !== CellValue.none) {
        return <div>{cell.value}</div>;
      }
    } else if (cell.state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }

    return null;
  };
  console.log(`Rerender for cell[${rowIndex}][${colIndex}]`)
  return (
    <div
      className={`Button ${cell.state === CellState.visible ? "visible" : ""}`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
