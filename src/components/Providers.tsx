"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: { mode: "light" },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" className="container">
          {children}
        </Container>
      </ThemeProvider>
    </Provider>
  );
}
