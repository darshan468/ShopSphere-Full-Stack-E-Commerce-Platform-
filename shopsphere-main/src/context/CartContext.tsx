'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { CartLine } from '@/types';

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartLine }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'SET_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; payload: CartLine[] };

const STORAGE_KEY = 'shopsphere_cart';

/** Reducer that owns all cart mutation logic, kept pure and easily unit-testable. */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { lines: action.payload };

    case 'ADD_ITEM': {
      const existing = state.lines.find(
        (line) => line.productId === action.payload.productId,
      );
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.productId === action.payload.productId
              ? { ...line, quantity: line.quantity + action.payload.quantity }
              : line,
          ),
        };
      }
      return { lines: [...state.lines, action.payload] };
    }

    case 'SET_QUANTITY':
      return {
        lines: state.lines
          .map((line) =>
            line.productId === action.payload.productId
              ? { ...line, quantity: action.payload.quantity }
              : line,
          )
          .filter((line) => line.quantity > 0),
      };

    case 'REMOVE_ITEM':
      return {
        lines: state.lines.filter((line) => line.productId !== action.payload.productId),
      };

    case 'CLEAR':
      return { lines: [] };

    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (line: CartLine) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotalCents: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });

  // Restore the cart from localStorage on mount (client-side only).
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) });
      } catch {
        // Ignore corrupted cart data.
      }
    }
  }, []);

  // Persist the cart to localStorage whenever it changes.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
  }, [state.lines]);

  const value = useMemo<CartContextValue>(() => {
    const subtotalCents = state.lines.reduce(
      (sum, line) => sum + line.priceCents * line.quantity,
      0,
    );
    const itemCount = state.lines.reduce((sum, line) => sum + line.quantity, 0);

    return {
      lines: state.lines,
      addItem: (line) => dispatch({ type: 'ADD_ITEM', payload: line }),
      removeItem: (productId) =>
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: 'SET_QUANTITY', payload: { productId, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      subtotalCents,
      itemCount,
    };
  }, [state.lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Hook giving access to the shopping cart from any client component. */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
