export enum CellValue {
    bomb,
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
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