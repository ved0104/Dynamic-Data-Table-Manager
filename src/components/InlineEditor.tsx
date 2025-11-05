"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { updateRow } from "../store/tableSlice";
import { Row } from "../types";

export default function InlineEditor({
  row,
  field,
  onDone,
}: {
  row: Row;
  field: string;
  onDone: () => void;
}) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(String(row[field] ?? ""));

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <TextField
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          const next = {
            ...row,
            [field]: field === "age" ? (value ? Number(value) : null) : value,
          };
          dispatch(updateRow(next));
          onDone();
        }}
      />
    </div>
  );
}
