import { configureStore } from "@reduxjs/toolkit";
import { DEFAULT_COLS, DEFAULT_ROWS, MIN_BOMBS } from "../constants";
import { generateCells } from "../utils";
import { reducer } from "./gameReducer";

const store = configureStore({
  reducer: reducer,
  preloadedState: {
    board: generateCells({ rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS }),
    gameSize: { rows: DEFAULT_ROWS, cols: DEFAULT_COLS, bombs: MIN_BOMBS },
    gameOver: false,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
