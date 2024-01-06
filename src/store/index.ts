import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { editorReducer } from "./reducers/editorReducer";
import { tableReducer } from "./reducers/tableReducer";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    table: tableReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
