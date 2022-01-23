import { DEFAULT_ROWS, DEFAULT_COLS, MIN_BOMBS } from '../constants';
import { CellValue, CellState, Cell, GameSize } from '../types';

export const generateCells = ({rows = DEFAULT_ROWS, cols = DEFAULT_COLS, bombs = MIN_BOMBS}: GameSize):Cell[][]  => {
    const cells: Cell[][] = [];
    const bombCells = randomUniqueNum(rows*cols, bombs);

    let index = 1;
    for (let row = 0; row < rows; row++) {
        cells.push([]);
        for (let col = 0; col < cols; col++) {
            cells[row].push({
                value: bombCells.includes(index) ? CellValue.bomb : CellValue.none,
                state: CellState.open,
            })
            index++;
        }
    }


    return cells;
}

function randomUniqueNum(range: number, outputCount: number) {

    let arr = []
    for (let i = 1; i <= range; i++) {
      arr.push(i)
    }
  
    let result = [];
  
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
  
    return result;
  }