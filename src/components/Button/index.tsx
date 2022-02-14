import React, { useCallback, useEffect } from "react";
import { useCellData, useGameDispatch } from "../../store/hooks";
import { Cell, CellState, CellValue, OPEN_CELL, FLAG_CELL, GAME_OVER } from "../../types";

import "./Button.scss";

interface CellButtonProps {
  colIndex: number;
  rowIndex: number;
}

const Button: React.FC<CellButtonProps> = ({ rowIndex, colIndex }) => {
  const cell: Cell = useCellData(rowIndex, colIndex);
  const dispatch = useGameDispatch();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
    },
    [dispatch, rowIndex, colIndex],
  );

  const onRightClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex });
    },
    [dispatch, rowIndex, colIndex],
  );

  useEffect(() => {
    if (cell.state === CellState.visible && cell.value === CellValue.bomb) {
      dispatch({ type: GAME_OVER })
    }
  }, [cell.state, cell.value, dispatch]);

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
  console.log(`Rerender for cell[${rowIndex}][${colIndex}]`);
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
