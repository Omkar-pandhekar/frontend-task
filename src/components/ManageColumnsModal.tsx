"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addColumn, toggleColumn } from "../store/tableSlice";

export default function ManageColumnsModal() {
  const [open, setOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const dispatch = useDispatch();
  const { columns } = useSelector((s: RootState) => s.table);

  const handleAdd = () => {
    const key = newKey.trim().replace(/\s+/g, "_").toLowerCase();
    if (!key) return;
    dispatch(addColumn({ key, label: newLabel || undefined }));
    setNewKey("");
    setNewLabel("");
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Manage Columns
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Manage Columns</DialogTitle>

        <DialogContent>
          <FormGroup>
            {columns.map((col) => (
              <FormControlLabel
                key={col.key}
                control={
                  <Checkbox
                    checked={col.visible}
                    onChange={() => dispatch(toggleColumn(col.key))}
                  />
                }
                label={col.label || col.key}
              />
            ))}
          </FormGroup>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ mt: 2 }}
          >
            <TextField
              label="New field key (e.g., department)"
              fullWidth
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <TextField
              label="Label (optional)"
              fullWidth
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
