"use client";

import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import {
  getDefaultCurrency,
  type CurrencyInfo,
  formatPrice as formatPriceHelper,
} from "@/lib/currency";

interface CurrencyContextValue {
  currency: CurrencyInfo;
  setCurrency: (c: CurrencyInfo) => void;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyInfo>(() =>
    getDefaultCurrency()
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice: (amount: number) => formatPriceHelper(amount, currency),
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
};
