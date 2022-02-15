export enum CellValue {
  bomb = "bomb",
  none = "0",
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
}

export enum CellState {
  open,
  visible,
  flagged,
}

export type Cell = {
  value: CellValue;
  state: CellState;
  row: number;
  col: number;
};

export interface GameSize {
  cols: number;
  rows: number;
  bombs: number;
}

export interface ClockParams {
  elapsedTime: number;
  intervalId: NodeJS.Timeout | undefined;
}

export interface GameState {
  board: Cell[][];
  gameSize: GameSize;
  gameOver: boolean;
  numOfFlagsLeft: number;
  playerWon: boolean;
  clock: ClockParams;
}
export const NEW_GAME = "NEW_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const REVEALE_NEIGHBOURS = "OPEN_NEIGHBOURS";
export const FLAG_CELL = "FLAG_CELL";
export const TICK = "TICK";
export const GAME_OVER = "GAME_OVER";

export type Action =
  | { type: "NEW_GAME"; size: GameSize }
  | { type: "GAME_OVER" }
  | { type: "OPEN_CELL"; row: number; col: number }
  | { type: "FLAG_CELL"; row: number; col: number }
  | { type: "TICK"; };
