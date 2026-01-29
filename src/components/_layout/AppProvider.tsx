"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "@/styles/theme";
import { CartProviderClient } from "@/components/Cart/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProviderClient>
          <CurrencyProvider>{children}</CurrencyProvider>
        </CartProviderClient>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
