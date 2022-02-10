import React from "react";
import { Cell, GameSize, GameState } from "../types";
import {
  createDispatchHook,
  createStoreHook,
  DefaultRootState,
  ReactReduxContextValue,
  shallowEqual,
  createSelectorHook,
} from "react-redux";
import { AnyAction } from "redux";

function useShallowEqualSelector<TState = DefaultRootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
): TSelected {
  return useSelector(selector, shallowEqual);
}

export const GameContext = React.createContext({} as ReactReduxContextValue<any, AnyAction>);
export const useStore = createStoreHook(GameContext);
export const useSelector = createSelectorHook(GameContext);
export const useBoard = (): Cell[][] => useShallowEqualSelector<GameState, Cell[][]>(state => state.board);
export const useGameSize = (): GameSize => useShallowEqualSelector<GameState, GameSize>(state => state.gameSize);
export const useCellData = (row: number, col: number): Cell =>
  useShallowEqualSelector<GameState, Cell>(state => state.board[row][col]);

export const useGameDispatch = createDispatchHook(GameContext);
