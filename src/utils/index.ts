import { DEFAULT_ROWS, DEFAULT_COLS, MIN_BOMBS } from "../constants";
import { CellValue, CellState, Cell, GameSize } from "../types";

export const generateCells = ({ rows = DEFAULT_ROWS, cols = DEFAULT_COLS, bombs = MIN_BOMBS }: GameSize): Cell[][] => {
  const cells: Cell[][] = [];
  const bombCells = randomUniqueNum(rows * cols, bombs);

  let index = 1;
  for (let row = 0; row < rows; row++) {
    cells.push([]);
    for (let col = 0; col < cols; col++) {
      cells[row].push({
        value: bombCells.includes(index) ? CellValue.bomb : CellValue.none,
        state: CellState.open,
      });
      index++;
    }
  }

  calculateBombCounts(cells);
  return cells;
};

function randomUniqueNum(range: number, outputCount: number) {
  const arr = [];
  for (let i = 1; i <= range; i++) {
    arr.push(i);
  }

  const result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

export const calculateBombCounts = (cells: Cell[][]): Cell[][] => {
  for (let i = 0; i < cells.length; i++) {
    const row = cells[i];
    for (let j = 0; j < row.length; j++) {
      // console.log("cell[" + i + "][" + j + "] = " + row[j]);
      cells[i][j] = calculateNumberOfBombs({ cells: cells, row: i, col: j });
    }
  }
  return cells;
};
interface CalculateNumberOfBombsInput {
  cells: Cell[][];
  row: number;
  col: number;
}

export function calculateNumberOfBombs({ cells, row, col }: CalculateNumberOfBombsInput): Cell {
  if (cells?.[row]?.[col]?.value === CellValue.bomb) {
    return cells?.[row]?.[col];
  }

  const upperLeft: CellValue = cells?.[row - 1]?.[col - 1]?.value;
  const upperMid: CellValue = cells?.[row - 1]?.[col]?.value;
  const upperRight: CellValue = cells?.[row - 1]?.[col + 1]?.value;
  const left: CellValue = cells?.[row]?.[col - 1]?.value;
  const right: CellValue = cells?.[row]?.[col + 1]?.value;
  const lowerLeft: CellValue = cells?.[row + 1]?.[col - 1]?.value;
  const lowerMid: CellValue = cells?.[row + 1]?.[col]?.value;
  const lowerRight: CellValue = cells?.[row + 1]?.[col + 1]?.value;

  const neighbors: CellValue[] = [upperLeft, upperMid, upperRight, left, right, lowerLeft, lowerMid, lowerRight];
  const numberOfNeightborBombs = neighbors
    .map((value): number => (value === CellValue.bomb ? 1 : 0))
    .reduce((prev, curr) => prev + curr)
    .toString();

  const cellValue: CellValue = <CellValue>numberOfNeightborBombs;

  const cell = cells[row][col];
  cell.value = cellValue;

  return cell;
}

export function changeCellState(cells: Cell[][], rowIndex: number, colIndex: number, newState: CellState): Cell[][] {
  const newCells = cells.map(function (arr) {
    return arr.slice();
  });

  newCells[rowIndex][colIndex] = {
    ...newCells[rowIndex][colIndex],
    state: newState,
  };
  return newCells;
}
