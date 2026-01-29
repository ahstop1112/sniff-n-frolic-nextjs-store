"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";

interface CartProviderClientProps {
  children: ReactNode;
}

export const CartProviderClient = ({ children }: CartProviderClientProps) => {
  return <CartProvider>{children}</CartProvider>;
};