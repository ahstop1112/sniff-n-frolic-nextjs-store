"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { WooCategory } from "@/lib/wooClient";

interface CategoriesContextType {
  categories: WooCategory[];
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: WooCategory[];
}) => {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): WooCategory[] => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoriesProvider");
  }
  return context.categories;
};
