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
        row: row,
        col: col,
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

  const neighbors = getNeighbors(cells, row, col);
  const numberOfNeightborBombs = neighbors
    .map(value => value.value)
    .map((value): number => (value === CellValue.bomb ? 1 : 0))
    .reduce((prev, curr) => prev + curr)
    .toString();

  const cellValue: CellValue = <CellValue>numberOfNeightborBombs;

  const cell = cells[row][col];
  cell.value = cellValue;

  return cell;
}

export function changeCellState(cells: Cell[][], rowIndex: number, colIndex: number, newState: CellState): Cell[][] {
  if (cells[rowIndex][colIndex].state === newState) {
    return cells;
  }
  let newCells = cells.map(function (arr) {
    return arr.slice();
  });

  newCells[rowIndex][colIndex] = {
    ...newCells[rowIndex][colIndex],
    state: newState,
  };

  //open neightbors recurseivly
  if (newState === CellState.visible && newCells[rowIndex][colIndex].value === CellValue.none) {
    const neighbors = getNeighbors(cells, rowIndex, colIndex);
    for (const neighbor of neighbors) {
      newCells = changeCellState(newCells, neighbor.row, neighbor.col, newState);
    }
  }
  return newCells;
}

function getNeighbors(cells: Cell[][], row: number, col: number): Cell[] {
  const upperLeft: Cell = cells?.[row - 1]?.[col - 1];
  const upperMid: Cell = cells?.[row - 1]?.[col];
  const upperRight: Cell = cells?.[row - 1]?.[col + 1];
  const left: Cell = cells?.[row]?.[col - 1];
  const right: Cell = cells?.[row]?.[col + 1];
  const lowerLeft: Cell = cells?.[row + 1]?.[col - 1];
  const lowerMid: Cell = cells?.[row + 1]?.[col];
  const lowerRight: Cell = cells?.[row + 1]?.[col + 1];

  const neighbors: Cell[] = [upperLeft, upperMid, upperRight, left, right, lowerLeft, lowerMid, lowerRight];

  return neighbors.filter(cell => cell !== undefined);
}

export function checkIfGameWon(board: Cell[][], numOfBombs: number): boolean {
  const flaggedBombs = board.flat().filter(cell => cell.value === CellValue.bomb && cell.state === CellState.flagged);
  const numOfFlaggedBombs = flaggedBombs.length;
  return numOfBombs === numOfFlaggedBombs;
}
