"use client";

import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataTable from "../components/DataTable";
import { useDispatch } from "react-redux";
import { setRows } from "../store/tableSlice";
import { Row } from "../types";
import Providers from "../components/Providers";

const SAMPLE: Row[] = [
  { id: "1", name: "Alice", email: "alice@example.com", age: 28, role: "Engineer" },
  { id: "2", name: "Bob", email: "bob@example.com", age: 34, role: "Manager" },
  { id: "3", name: "Cara", email: "cara@example.com", age: 22, role: "Designer" },
];

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRows(SAMPLE));
  }, [dispatch]);

  return (
    <Providers>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dynamic Data Table Manager
        </Typography>
        <DataTable />
      </Box>
    </Providers>
  );
}
