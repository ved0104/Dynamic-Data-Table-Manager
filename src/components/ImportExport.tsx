"use client";
import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setRows } from "../store/tableSlice";
import { parseCsv, exportCsv } from "../utils/csv";
import { saveAs } from "file-saver";
import { RootState } from "../store";

export default function ImportExport({
  visibleColumns,
}: {
  visibleColumns: { key: string; label: string }[];
}) {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const rows = useSelector((s: RootState) => s.table.rows);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        ref={fileRef}
        accept=".csv"
        type="file"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const res = await parseCsv(file);
          if (res.errors.length) alert("CSV errors:\\n" + res.errors.join("\\n"));
          dispatch(setRows(res.data));
        }}
      />
      <Button onClick={() => fileRef.current?.click()} variant="outlined">
        Import CSV
      </Button>
      <Button
        onClick={() => {
          const blob = exportCsv(rows, visibleColumns);
          saveAs(blob, "export.csv");
        }}
        variant="outlined"
      >
        Export CSV
      </Button>
    </div>
  );
}
