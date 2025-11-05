"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setColumns, toggleColumn } from "../store/tableSlice";
import { ColumnDef } from "../types";

export default function ManageColumnsModal() {
  const dispatch = useDispatch();
  const { columns } = useSelector((s: RootState) => s.table);
  const [open, setOpen] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newLabel, setNewLabel] = useState("");

  function addColumn() {
    if (!newKey) return;
    const next: ColumnDef[] = [
      ...columns,
      { key: newKey, label: newLabel || newKey, visible: true },
    ];
    dispatch(setColumns(next));
    setNewKey("");
    setNewLabel("");
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Manage Columns
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {columns.map((c) => (
            <div key={c.key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={c.visible}
                    onChange={() => dispatch(toggleColumn(c.key))}
                  />
                }
                label={c.label}
              />
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <TextField
              label="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              size="small"
            />
            <TextField
              label="Label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              size="small"
            />
            <Button onClick={addColumn}>Add</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
