import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Row, ColumnDef } from '../types';

type State = {
  rows: Row[];
  columns: ColumnDef[];
};

const initialColumns: ColumnDef[] = [
  { key: 'name', label: 'Name', visible: true },
  { key: 'email', label: 'Email', visible: true },
  { key: 'age', label: 'Age', visible: true },
  { key: 'role', label: 'Role', visible: true },
];

const initialState: State = {
  rows: [],
  columns: initialColumns,
};

const slice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) {
      state.rows = action.payload;
    },
    addRow(state, action: PayloadAction<Row>) {
      state.rows.unshift(action.payload);
    },
    updateRow(state, action: PayloadAction<Row>) {
      const idx = state.rows.findIndex((r) => r.id === action.payload.id);
      if (idx >= 0) state.rows[idx] = action.payload;
    },
    deleteRow(state, action: PayloadAction<string>) {
      state.rows = state.rows.filter((r) => r.id !== action.payload);
    },
    setColumns(state, action: PayloadAction<ColumnDef[]>) {
      state.columns = action.payload;
    },
    toggleColumn(state, action: PayloadAction<string>) {
      const c = state.columns.find((x) => x.key === action.payload);
      if (c) c.visible = !c.visible;
    },
  },
});

export const { setRows, addRow, updateRow, deleteRow, setColumns, toggleColumn } = slice.actions;
export default slice.reducer;
