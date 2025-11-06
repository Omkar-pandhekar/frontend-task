export type RowData = {
  id: string;
  [key: string]: any;
};

export type ColumnConfig = {
  key: string;
  label?: string;
  visible: boolean;
};

export type SortOrder = "asc" | "desc" | "none";

export type SortState = {
  key: string;
  order: SortOrder;
};
