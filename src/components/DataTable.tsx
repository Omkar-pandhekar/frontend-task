"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TextField,
  TablePagination,
  IconButton,
  Stack,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  deleteRow,
  setPage,
  setPageSize,
  setSearch,
  setSort,
  startEdit,
  updateEditField,
  cancelAllEdits,
  saveAllEdits,
} from "@/store/tableSlice";
import type { TableState } from "@/store/tableSlice";
import type { SortState } from "@/types";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";
import type { RowData } from "@/types";

export default function DataTable() {
  const dispatch = useDispatch();
  const { data, columns, search, sort, page, pageSize, editing } = useSelector(
    (s: RootState) => (s as RootState & { table: TableState }).table
  );

  const [confirmId, setConfirmId] = useState<string | null>(null);

  const visibleCols = columns.filter((c) => c.visible);

  // SEARCH
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [data, search]);

  // SORT
  const sorted = useMemo(() => {
    if (!sort.key || sort.order === "none") return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const va = a[sort.key] ?? "";
      const vb = b[sort.key] ?? "";
      if (va < vb) return sort.order === "asc" ? -1 : 1;
      if (va > vb) return sort.order === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sort]);

  // PAGINATION
  const paged = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const handleRequestSort = (key: string) => {
    let order: SortState["order"] = "asc";
    if (sort.key === key) {
      order =
        sort.order === "asc" ? "desc" : sort.order === "desc" ? "none" : "asc";
    }
    dispatch(setSort({ key, order }));
  };

  const onEdit = (id: string) => dispatch(startEdit(id));
  const onFieldChange = (id: string, key: string, value: string) =>
    dispatch(updateEditField({ id, key, value }));

  const isEditing = (id: string) => !!editing[id];

  return (
    <>
      {/* Search + Save/Cancel all */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Global search"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          fullWidth
        />

        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<Save />}
            variant="contained"
            onClick={() => dispatch(saveAllEdits())}
          >
            Save All
          </Button>
          <Button
            startIcon={<Cancel />}
            variant="outlined"
            onClick={() => dispatch(cancelAllEdits())}
          >
            Cancel All
          </Button>
        </Stack>
      </Stack>

      {/* TABLE */}
      <Table size="small">
        <TableHead>
          <TableRow>
            {visibleCols.map((col) => (
              <TableCell key={col.key}>
                <TableSortLabel
                  active={col.key === sort.key && sort.order !== "none"}
                  direction={sort.order === "desc" ? "desc" : "asc"}
                  onClick={() => handleRequestSort(col.key)}
                >
                  {col.label || col.key}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paged.map((row) => (
            <TableRow key={row.id} hover>
              {visibleCols.map((col) => (
                <TableCell key={col.key}>
                  {isEditing(row.id) ? (
                    <input
                      value={String(
                        (editing[row.id] as RowData)[col.key] ?? ""
                      )}
                      onChange={(e) =>
                        onFieldChange(row.id, col.key, e.target.value)
                      }
                      style={{
                        width: "100%",
                        background: "transparent",
                        color: "inherit",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 6,
                        padding: 6,
                      }}
                    />
                  ) : (
                    String(row[col.key] ?? "")
                  )}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEdit(row.id)}>
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => setConfirmId(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_, p) => dispatch(setPage(p))}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) =>
          dispatch(setPageSize(parseInt(e.target.value, 10)))
        }
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Delete confirmation */}
      <Dialog open={!!confirmId} onClose={() => setConfirmId(null)}>
        <DialogTitle>Delete row?</DialogTitle>
        <DialogContent>Are you sure you want to delete this row?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (confirmId) {
                dispatch(deleteRow(confirmId));
                setConfirmId(null);
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
