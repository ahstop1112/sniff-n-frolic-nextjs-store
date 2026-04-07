"use client";

import { useState, useEffect, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "@/app/theme";
import { CartProviderClient } from "@/components/Cart/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";

const AppProviders = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProviderClient>
          <CurrencyProvider>
            {mounted ? children : null}
          </CurrencyProvider>
        </CartProviderClient>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default AppProviders;
