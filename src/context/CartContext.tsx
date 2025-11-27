"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartState, AddToCartInput } from "@/lib/cartTypes";

const STORAGE_KEY = "sniff-cart-v1";

interface CartContextValue extends CartState {
  addItem: (input: AddToCartInput, quantity?: number) => void;
  removeItem: (id: number, variantKey?: string) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number, variantKey?: string) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const loadInitialCart = (): CartState => {
  if (typeof window === "undefined") return { items: [] };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw) as CartState;
  } catch {
    return { items: [] };
  }
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, setState] = useState<CartState>({ items: [] });

  // 初次 mount 時先 from localStorage 讀返
  useEffect(() => {
    const initial = loadInitialCart();
    setState(initial);
  }, []);

  // 每次變更就寫入 localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const addItem = (input: AddToCartInput, quantity: number = 1) => {
    setState((prev) => {
      const items = [...prev.items];
      const key = `${input.id}-${input.variantKey ?? ""}`;

      const existingIndex = items.findIndex(
        (it) => `${it.id}-${it.variantKey ?? ""}` === key
      );

      if (existingIndex >= 0) {
        items[existingIndex] = {
          ...items[existingIndex],
          quantity: items[existingIndex].quantity + quantity,
        };
      } else {
        items.push({
          id: input.id,
          slug: input.slug,
          name: input.name,
          price: input.price,
          imageUrl: input.imageUrl,
          quantity,
          variantKey: input.variantKey,
        });
      }

      return { items };
    });
  };

  const removeItem = (id: number, variantKey?: string) => {
    setState((prev) => {
      const key = `${id}-${variantKey ?? ""}`;
      const items = prev.items.filter(
        (it) => `${it.id}-${it.variantKey ?? ""}` !== key
      );
      return { items };
    });
  };

  const clearCart = () => setState({ items: [] });

  const updateQuantity = (
    id: number,
    quantity: number,
    variantKey?: string
  ) => {
    setState((prev) => {
      const key = `${id}-${variantKey ?? ""}`;
      const items = prev.items.map((it) =>
        `${it.id}-${it.variantKey ?? ""}` === key
          ? { ...it, quantity: Math.max(1, quantity) }
          : it
      );
      return { items };
    });
  };

  const totalItems = useMemo(
    () => state.items.reduce((sum, it) => sum + it.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = {
    ...state,
    addItem,
    removeItem,
    clearCart,
    updateQuantity,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};