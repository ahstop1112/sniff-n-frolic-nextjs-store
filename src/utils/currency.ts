import { wooFetch } from "@/lib/wooClient";

export interface StoreCurrency {
  code: string; // e.g. "CAD"
  symbol: string; // e.g. "$" / "CA$"
}

export const getStoreCurrency = async (): Promise<StoreCurrency> => {
  const status = await wooFetch("system_status");

  // Woo system_status
  const code = status && status.currency ? status.currency || "CAD";
  const symbol = status && status.currency_symbol || "$";

  return { code, symbol };
};
