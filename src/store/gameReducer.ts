import { Reducer } from "@reduxjs/toolkit";
import { DEFAULT_COLS, DEFAULT_ROWS, MIN_BOMBS } from "../constants";
// import { isGameOver } from "../selectors/game-selectors";
// import { markCell } from "../services/cell-marker";
// import { revealeCell, revealeCellFirstOrderNeighbours } from "../services/cells-revealer";
// import { getNewGame } from "../services/game-generator";
// import { stopTimer } from "../services/timer";
import { Action, OPEN_CELL, GameState, Cell, NEW_GAME, GameSize, FLAG_CELL, CellState } from "../types";
import { changeCellState, generateCells } from "../utils";

// const tick = (game: GameState) => {
//   const elapsed = game.elapsed < 999 ? game.elapsed + 1 : game.elapsed;
//   return { ...game, elapsed };
// };

const openCell = (board: Cell[][], cellRow: number, cellCol: number) => {
  const newBoard = changeCellState(board, cellRow, cellCol, CellState.visible);
  return newBoard;
};

const flagCell = (board: Cell[][], cellRow: number, cellCol: number) => {
    const newBoard = changeCellState(board, cellRow, cellCol, CellState.flagged);
    return newBoard;
  };

// const revealeCellNeighbours = (game: GameData, cellKey: number) => {
//   const { minesField, size } = game;
//   const newMinesField = revealeCellFirstOrderNeighbours({ minesField, cellKey, size });
//   return { ...game, minesField: newMinesField };
// };

// const markCellInMinesField = (game: GameData, key: number) => {
//   const { minesField } = game;
//   return { ...game, minesField: markCell(minesField, key) };
// };

const newGame = (size: GameSize): GameState => {
  return {
    gameSize: {...size},
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
    // case OPEN_NEIGHBOURS:
    //     return { ...state, game:  revealeCellNeighbours(game, action.key)};
    case FLAG_CELL:
        return { ...state, board: flagCell(board, action.row, action.col) };
    case NEW_GAME:
      return {...state, ...newGame(action.size)};
    // case TICK:
    //   return { ...state, game: tick(game) };
    default:
      return state;
  }
};
