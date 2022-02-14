import { Reducer } from "@reduxjs/toolkit";
import { DEFAULT_COLS, DEFAULT_ROWS, MIN_BOMBS } from "../constants";
import { Action, OPEN_CELL, GameState, Cell, NEW_GAME, GameSize, FLAG_CELL, CellState, GAME_OVER } from "../types";
import { changeCellState, checkIfGameWon, generateCells } from "../utils";

const openCell = (board: Cell[][], cellRow: number, cellCol: number) => {
  return changeCellState(board, cellRow, cellCol, CellState.visible);
};

const flagCell = (gameState: GameState, cellRow: number, cellCol: number) => {
  const { board, numOfFlagsLeft, gameSize } = gameState;
  const { state } = board[cellRow][cellCol];
  if (state === CellState.visible) {
    return board;
  }

  let newBoard: Cell[][];
  const newState: GameState = {
    ...gameState,
  };
  if (state === CellState.flagged) {
    newState.numOfFlagsLeft = numOfFlagsLeft + 1;
    newBoard = changeCellState(board, cellRow, cellCol, CellState.open);
  } else {
    newState.numOfFlagsLeft = numOfFlagsLeft - 1;
    if (newState.numOfFlagsLeft < 0) {
      return gameState;
    }
    newBoard = changeCellState(board, cellRow, cellCol, CellState.flagged);
  }
  newState.board = newBoard;
  newState.gameOver = checkIfGameWon(newBoard, gameSize.bombs);
  newState.playerWon = newState.gameOver;
  return newState;
};

const newGame = (size: GameSize): GameState => {
  return {
    gameSize: { ...size },
    gameOver: false,
    board: generateCells(size),
    numOfFlagsLeft: size.bombs,
    playerWon: false,
  };
};

export const reducer: Reducer<GameState, Action> = (
  state: GameState = {
    board: generateCells({ rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS }),
    gameSize: { rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS },
    gameOver: false,
    numOfFlagsLeft: MIN_BOMBS,
    playerWon: false,
  },
  action: Action,
): GameState => {
  const { board, gameOver } = state;
  switch (action.type) {
    case OPEN_CELL:
      return gameOver ? { ...state } : { ...state, board: openCell(board, action.row, action.col) };
    case FLAG_CELL:
      return gameOver ? { ...state } : { ...state, ...flagCell(state, action.row, action.col) };
    case NEW_GAME:
      return { ...state, ...newGame(action.size) };
    case GAME_OVER:
      return { ...state, gameOver: true };
    default:
      return state;
  }
};
