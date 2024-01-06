import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TableData = { [key: string]: string }[];
const initialState: {
  table: TableData;
} = {
  table: [],
};
export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    addTableData: (state, action: PayloadAction<TableData>) => {
      state.table = action.payload;
    },
  },
});

export const { addTableData } = table.actions;

export const { reducer: tableReducer } = table;
