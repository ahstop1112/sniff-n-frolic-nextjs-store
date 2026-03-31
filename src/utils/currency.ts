import { wooFetch, WooSystemStatus } from "@/lib/wooClient";

export interface StoreCurrency {
  code: string; // e.g. "CAD"
  symbol: string; // e.g. "$" / "CA$"
}

export const getStoreCurrency = async (): Promise<StoreCurrency> => {
  const status = await wooFetch<WooSystemStatus>("system_status");

  // Woo system_status
  const code = status?.settings?.currency ?? "CAD";
  const symbol = status?.settings?.currency_symbol ?? "$";

  return { code, symbol };
};
