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
  hydrated: boolean;
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

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, setState] = useState<CartState>({ items: [] });
  const [hydrated, setHydrated] = useState(false);

  // 1) hydrate from localStorage (once)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setState({ items: parsed as CartItem[] });
        }
      }
    } catch {
      // ignore bad JSON
    } finally {
      setHydrated(true);
    }
  }, []);

  // 2) persist to localStorage (only after hydrated)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, hydrated]);

  const addItem = (input: AddToCartInput, quantity: number = 1) => {
    setState((prev) => {
      const items = [...prev.items];
      const key = `${input.id}-${input.variantKey ?? ""}`;
      const safeQty = Math.max(1, Math.min(99, Number(quantity) || 1));

      const idx = items.findIndex(
        (it) => `${it.id}-${it.variantKey ?? ""}` === key,
      );

      if (idx >= 0) {
        items[idx] = {
          ...items[idx],
          quantity: Math.max(1, (Number(items[idx].quantity) || 1) + safeQty),
        };
      } else {
        items.push({
          id: input.id,
          slug: input.slug,
          name: input.name,
          price: input.price,
          imageUrl: input.imageUrl,
          quantity: safeQty,
          variantKey: input.variantKey,
        } as CartItem);
      }

      return { items };
    });
  };

  const removeItem = (id: number, variantKey?: string) => {
    setState((prev) => {
      const key = `${id}-${variantKey ?? ""}`;
      const items = prev.items.filter(
        (it) => `${it.id}-${it.variantKey ?? ""}` !== key,
      );
      return { items };
    });
  };

  const clearCart = () => {
    setState({ items: [] });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const updateQuantity = (
    id: number,
    quantity: number,
    variantKey?: string,
  ) => {
    setState((prev) => {
      const key = `${id}-${variantKey ?? ""}`;
      const nextQty = Math.max(1, Math.min(99, Number(quantity) || 1));

      const items = prev.items.map((it) =>
        `${it.id}-${it.variantKey ?? ""}` === key
          ? { ...it, quantity: nextQty }
          : it,
      );

      return { items };
    });
  };

  const totalItems = useMemo(
    () => state.items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0),
    [state.items],
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce((sum, it) => {
        const price = Number((it as any).price) || 0; // defensive
        const qty = Number(it.quantity) || 0;
        return sum + price * qty;
      }, 0),
    [state.items],
  );

  const value: CartContextValue = {
    ...state,
    hydrated,
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
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
