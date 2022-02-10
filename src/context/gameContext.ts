import React from "react";
import { useContext } from "react";
import { Cell, GameSize, GameState } from "../types";
import store, { AppDispatch } from "../store/store";
import { DefaultRootState, shallowEqual, useSelector } from "react-redux";

function useShallowEqualSelector<TState = DefaultRootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
): TSelected {
  return useSelector(selector, shallowEqual);
}

export const GameContext = React.createContext<GameState>(store.getState());
export const useGameContext = () => useContext(GameContext);
export const useBoard = (): Cell[][] => useShallowEqualSelector<GameState, Cell[][]>(state => state.board);
export const useGameSize = (): GameSize => useShallowEqualSelector<GameState, GameSize>(state => state.gameSize);
export const useCellData = (row: number, col: number): Cell =>
  useShallowEqualSelector<GameState,Cell>(state => state.board[row][col]);

export const GameDispatchContext = React.createContext<AppDispatch>(store.dispatch);
export const useGameDispatchContext = () => useContext(GameDispatchContext);
