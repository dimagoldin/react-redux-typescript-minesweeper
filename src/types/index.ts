export enum CellValue {
    bomb = 'bomb',
    none = '0',
    one = '1',
    two = '2',
    three = '3',
    four = '4',
    five = '5',
    six = '6',
    seven = '7',
    eight = '8',
}

export enum CellState {
    open,
    visible,
    flagged,
}

export type Cell = {
    value: CellValue;
    state: CellState;
}

export interface GameSize {
    cols: number;
    rows: number;
    bombs: number;
}