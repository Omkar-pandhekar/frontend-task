"use client";

import { Button, Stack } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setData, resetToDefaults } from "../store/tableSlice";
import type { TableState } from "../store/tableSlice";
import { saveAs } from "file-saver";
import { toCSV } from "@/utils/csv";
import { v4 as uuidv4 } from "uuid";
import type React from "react";

export default function ImportExportButtons() {
  const dispatch = useDispatch();
  const { data, columns } = useSelector(
    (s: RootState) => (s as RootState & { table: TableState }).table
  );

  const onImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: { data: Record<string, string>[] }) => {
        const rows = result.data.map((r) => ({
          id: uuidv4(),
          ...r,
        }));
        dispatch(setData(rows));
      },
      error: (err: { message: string }) => {
        alert(`CSV parse error: ${err.message}`);
      },
    });
    e.currentTarget.value = "";
  };

  const onExport = () => {
    const csv = toCSV(data, columns);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "table_export.csv");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" component="label">
        Import CSV
        <input
          hidden
          type="file"
          accept=".csv,text/csv"
          onChange={onImportChange}
        />
      </Button>

      <Button variant="outlined" onClick={onExport}>
        Export CSV
      </Button>

      <Button variant="text" onClick={() => dispatch(resetToDefaults())}>
        Reset to Mock Data
      </Button>
    </Stack>
  );
}
