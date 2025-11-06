"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Stack,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { store, persistor } from "@/store";

export default function Providers({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.getItem("theme-mode") as "light" | "dark")) ||
      "dark"
  );
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Stack direction="row" justifyContent="flex-end" sx={{ p: 1 }}>
            <IconButton
              onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
              aria-label="toggle theme"
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Stack>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
