import { Reducer } from "@reduxjs/toolkit";
import { DEFAULT_COLS, DEFAULT_ROWS, MIN_BOMBS } from "../constants";
import { Action, OPEN_CELL, GameState, Cell, NEW_GAME, GameSize, FLAG_CELL, CellState } from "../types";
import { changeCellState, generateCells } from "../utils";

const openCell = (board: Cell[][], cellRow: number, cellCol: number) => {
  const newBoard = changeCellState(board, cellRow, cellCol, CellState.visible);
  return newBoard;
};

const flagCell = (board: Cell[][], cellRow: number, cellCol: number) => {
  const newBoard = changeCellState(board, cellRow, cellCol, CellState.flagged);
  return newBoard;
};

const newGame = (size: GameSize): GameState => {
  return {
    gameSize: { ...size },
    gameOver: false,
    board: generateCells(size),
  };
};

export const reducer: Reducer<GameState, Action> = (
  state: GameState = {
    board: generateCells({ rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS }),
    gameSize: { rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS },
    gameOver: false,
  },
  action: Action,
): GameState => {
  const { board } = state;
  switch (action.type) {
    case OPEN_CELL:
      return { ...state, board: openCell(board, action.row, action.col) };
    case FLAG_CELL:
      return { ...state, board: flagCell(board, action.row, action.col) };
    case NEW_GAME:
      return { ...state, ...newGame(action.size) };
    default:
      return state;
  }
};
