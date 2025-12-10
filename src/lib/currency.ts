export type CurrencyCode = string;

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  locale: string;
}

export const getDefaultCurrency = (): CurrencyInfo => {
  const code = process.env.NEXT_PUBLIC_STORE_CURRENCY_CODE ?? "CAD";

  if (code === "USD") {
    return { code: "USD", symbol: "$", locale: "en-US" };
  }

  if (code === "HKD") {
    return { code: "HKD", symbol: "$", locale: "zh-HK" };
  }

  return { code: "CAD", symbol: "CA$", locale: "en-CA" };
};

export const formatPrice = (
  amount: number,
  currencyInfo?: CurrencyInfo
): string => {
  const c = currencyInfo ?? getDefaultCurrency();

  try {
    const formattedNumber = new Intl.NumberFormat(c.locale, {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);

    // 針對唔同 code，自己決定外觀
    if (c.code === "CAD") {
      return `CA$${formattedNumber}`;
    }

    if (c.code === "USD") {
      return `$${formattedNumber}`;
    }

    if (c.code === "HKD") {
      return `HK$${formattedNumber}`;
    }

    return `${c.code} ${formattedNumber}`;
  } catch {
    return `${c.code} ${amount.toFixed(2)}`;
  }
};
