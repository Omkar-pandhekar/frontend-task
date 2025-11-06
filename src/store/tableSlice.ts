import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RowData, ColumnConfig, SortState } from "@/types";

const defaultColumns: ColumnConfig[] = [
  { key: "name", label: "Name", visible: true },
  { key: "email", label: "Email", visible: true },
  { key: "age", label: "Age", visible: true },
  { key: "role", label: "Role", visible: true },
];

const sampleData: RowData[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    role: "Developer",
  },
  {
    id: "2",
    name: "Bob Singh",
    email: "bob@example.com",
    age: 34,
    role: "Designer",
  },
  {
    id: "3",
    name: "Carlos D",
    email: "carlos@example.com",
    age: 24,
    role: "Intern",
  },
  {
    id: "4",
    name: "Divya K",
    email: "divya@example.com",
    age: 30,
    role: "Manager",
  },
  { id: "5", name: "Esha P", email: "esha@example.com", age: 26, role: "QA" },
  {
    id: "6",
    name: "Fahad A",
    email: "fahad@example.com",
    age: 31,
    role: "DevOps",
  },
  {
    id: "7",
    name: "Gauri M",
    email: "gauri@example.com",
    age: 29,
    role: "Developer",
  },
  {
    id: "8",
    name: "Harsh V",
    email: "harsh@example.com",
    age: 27,
    role: "Developer",
  },
  {
    id: "9",
    name: "Ishita R",
    email: "ishita@example.com",
    age: 32,
    role: "Product",
  },
  {
    id: "10",
    name: "Jon Doe",
    email: "jon@example.com",
    age: 25,
    role: "Support",
  },
  {
    id: "11",
    name: "Karan T",
    email: "karan@example.com",
    age: 35,
    role: "Developer",
  },
];

export interface TableState {
  data: RowData[];
  columns: ColumnConfig[];
  search: string;
  sort: SortState;
  page: number;
  pageSize: number;
  editing: Record<string, RowData>;
}

const initialState: TableState = {
  data: sampleData,
  columns: defaultColumns,
  search: "",
  sort: { key: "", order: "none" },
  page: 0,
  pageSize: 10,
  editing: {},
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<RowData[]>) => {
      state.data = action.payload;
      state.page = 0;
    },

    resetToDefaults: (state) => {
      state.data = sampleData;
      state.columns = defaultColumns.map((c) => ({ ...c }));
      state.search = "";
      state.sort = { key: "", order: "none" };
      state.page = 0;
      state.pageSize = 10;
      state.editing = {};
    },

    toggleColumn: (state, action: PayloadAction<string>) => {
      const col = state.columns.find(
        (c: ColumnConfig) => c.key === action.payload
      );
      if (col) col.visible = !col.visible;
    },

    addColumn: (
      state,
      action: PayloadAction<{ key: string; label?: string }>
    ) => {
      const exists = state.columns.some(
        (c: ColumnConfig) => c.key === action.payload.key
      );
      if (!exists) {
        state.columns.push({
          key: action.payload.key,
          label: action.payload.label || action.payload.key,
          visible: true,
        });
      }

      state.data = state.data.map((r: RowData) => ({
        ...r,
        [action.payload.key]: r[action.payload.key] ?? "",
      }));
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 0;
    },

    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 0;
    },

    startEdit: (state, action: PayloadAction<string>) => {
      const row = state.data.find((r: RowData) => r.id === action.payload);
      if (row) state.editing[row.id] = { ...row };
    },

    updateEditField: (
      state,
      action: PayloadAction<{ id: string; key: string; value: unknown }>
    ) => {
      const { id, key, value } = action.payload;
      if (state.editing[id]) state.editing[id][key] = value;
    },

    cancelAllEdits: (state) => {
      state.editing = {};
    },

    saveAllEdits: (state) => {
      const editedIds = Object.keys(state.editing);
      state.data = state.data.map((r: RowData) =>
        editedIds.includes(r.id) ? { ...state.editing[r.id] } : r
      );
      state.editing = {};
    },

    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((r: RowData) => r.id !== action.payload);
    },
  },
});

export const {
  setData,
  resetToDefaults,
  toggleColumn,
  addColumn,
  setSearch,
  setSort,
  setPage,
  setPageSize,
  startEdit,
  updateEditField,
  cancelAllEdits,
  saveAllEdits,
  deleteRow,
} = tableSlice.actions;

export default tableSlice.reducer;
