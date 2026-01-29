"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { WooProduct } from "@/lib/wooClient";

export type FetchOptions = {
  page?: number;
  per_page?: number;
  category?: number;
  search?: string;
  orderby?: "date" | "title" | "price";
  order?: "asc" | "desc";
  min_price?: string;
  max_price?: string;
  on_sale?: boolean;
  stock_status?: "instock" | "outofstock" | "onbackorder";
};

interface ProductsContextType {
  products: WooProduct[];
  loading: boolean;
  error: string | null;
  fetchProducts: (options?: FetchOptions) => Promise<void>;
  setProducts: (p: WooProduct[]) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({
  children,
  initialProducts = [],
}: {
  children: ReactNode;
  initialProducts?: WooProduct[];
}) => {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (options?: FetchOptions) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(options),
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = (await res.json()) as WooProduct[];
      setProducts(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, fetchProducts, setProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};
