import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter/counterSlice";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import postSlice from "./post/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    post: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
