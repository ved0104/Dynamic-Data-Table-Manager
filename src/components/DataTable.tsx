"use client";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import ManageColumnsModal from "./ManageColumnsModal";
import ImportExport from "./ImportExport";
import InlineEditor from "./InlineEditor";
import Button from "@mui/material/Button";

export default function DataTable() {
  const { rows, columns } = useSelector((s: RootState) => s.table);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const rowsPerPage = 10;

  const visibleCols = columns.filter((c) => c.visible);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let data = rows.slice();
    if (q) {
      data = data.filter((r) =>
        visibleCols.some((c) => String(r[c.key] ?? "").toLowerCase().includes(q))
      );
    }
    if (orderBy) {
      data.sort((a, b) => {
        const av = a[orderBy.key] ?? "";
        const bv = b[orderBy.key] ?? "";
        if (av === bv) return 0;
        if (orderBy.dir === "asc") return av > bv ? 1 : -1;
        return av > bv ? -1 : 1;
      });
    }
    return data;
  }, [rows, search, orderBy, visibleCols]);

  const pageRows = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <div style={{ display: "flex", gap: 12, padding: 12, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Global search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
        <ManageColumnsModal />
        <ImportExport visibleColumns={visibleCols} />
        <Button variant="outlined">Toggle Inline Edit</Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleCols.map((col) => (
                <TableCell key={col.key}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {col.label}
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOrderBy((prev) =>
                          prev && prev.key === col.key
                            ? { key: col.key, dir: prev.dir === "asc" ? "desc" : "asc" }
                            : { key: col.key, dir: "asc" }
                        );
                      }}
                    >
                      <SortIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pageRows.map((row) => (
              <TableRow key={row.id} hover onDoubleClick={() => setEditingRow(row.id)}>
                {visibleCols.map((col) => (
                  <TableCell key={col.key}>
                    {editingRow === row.id ? (
                      <InlineEditor row={row} field={col.key} onDone={() => setEditingRow(null)} />
                    ) : (
                      String(row[col.key] ?? "")
                    )}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(e, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Paper>
  );
}
