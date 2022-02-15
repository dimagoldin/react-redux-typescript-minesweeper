import { Reducer } from "@reduxjs/toolkit";
import { DEFAULT_COLS, DEFAULT_ROWS, MIN_BOMBS } from "../constants";
import {
  Action,
  OPEN_CELL,
  GameState,
  Cell,
  NEW_GAME,
  GameSize,
  FLAG_CELL,
  CellState,
  GAME_OVER,
  TICK,
  ClockParams,
} from "../types";
import { changeCellState, checkIfGameWon, generateCells } from "../utils";
import store from "./store";

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

const newGame = (state: GameState, size: GameSize): GameState => {
  const { clock } = state;
  if (clock.intervalId !== undefined) {
    clearInterval(clock.intervalId);
  }
  return {
    gameSize: { ...size },
    gameOver: false,
    board: generateCells(size),
    numOfFlagsLeft: size.bombs,
    playerWon: false,
    clock: {
      elapsedTime: -1,
      intervalId: setInterval(() => store.dispatch({ type: TICK }), 1000),
    },
  };
};

//TODO: why do i need default state in reducer and in store creation? can i avoid one of them?
export const reducer: Reducer<GameState, Action> = (
  state: GameState = {
    board: generateCells({ rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS }),
    gameSize: { rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS },
    gameOver: false,
    numOfFlagsLeft: MIN_BOMBS,
    playerWon: false,
    clock: {
      elapsedTime: -1,
      intervalId: setInterval(() => store.dispatch({ type: TICK }), 1000),
      //TODO: any way to avoid using store directly here to dispatch?
    },
  },
  action: Action,
): GameState => {
  const { board, gameOver, clock } = state;

  switch (action.type) {
    case OPEN_CELL:
      return gameOver ? { ...state } : { ...state, board: openCell(board, action.row, action.col) };
    case FLAG_CELL:
      return gameOver ? { ...state } : { ...state, ...flagCell(state, action.row, action.col) };
    case NEW_GAME:
      return { ...state, ...newGame(state, action.size) };
    case GAME_OVER:
      return { ...doGameOver(state) };
    case TICK:
      return gameOver
        ? doGameOver(state)
        : {
            ...state,
            clock: tickTack(clock),
          };
    default:
      return state;
  }
};
function tickTack({ elapsedTime, intervalId }: ClockParams): ClockParams {
  if (elapsedTime > 999 && intervalId) {
    clearInterval(intervalId);
    return {
      elapsedTime,
      intervalId,
    };
  }
  return {
    elapsedTime: elapsedTime + 1,
    intervalId: intervalId === undefined ? setInterval(() => store.dispatch({ type: TICK }), 1000) : intervalId,
  };
}

function doGameOver(state: GameState): GameState {
  const { clock } = state;

  clock.intervalId && clearInterval(clock.intervalId);

  const newState: GameState = {
    ...state,
    gameOver: true,
    clock: {
      ...clock,
      intervalId: undefined,
    },
  };
  return newState;
}
