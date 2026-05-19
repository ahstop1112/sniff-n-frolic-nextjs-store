export interface StoreCurrency {
  code: string; // e.g. "CAD"
  symbol: string; // e.g. "$" / "CA$"
}

export const getStoreCurrency = async (): Promise<StoreCurrency> => {
  return { code: "CAD", symbol: "$" };
};
