"use client";

import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "@/app/theme";
import { CartProviderClient } from "@/components/Cart/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProviderClient>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </CartProviderClient>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default AppProviders;