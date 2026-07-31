import { act, renderHook } from '@testing-library/react';
import { cartReducer, CartProvider, useCart } from '@/context/CartContext';
import type { CartLine } from '@/types';

const sampleLine: CartLine = {
  productId: 'p1',
  name: 'Sample product',
  priceCents: 1000,
  imageUrl: '/sample.jpg',
  quantity: 1,
};

describe('cartReducer', () => {
  it('adds a new item to an empty cart', () => {
    const state = cartReducer({ lines: [] }, { type: 'ADD_ITEM', payload: sampleLine });
    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].productId).toBe('p1');
  });

  it('increments quantity when the same item is added twice', () => {
    let state = cartReducer({ lines: [] }, { type: 'ADD_ITEM', payload: sampleLine });
    state = cartReducer(state, { type: 'ADD_ITEM', payload: sampleLine });

    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].quantity).toBe(2);
  });

  it('updates the quantity of an existing item', () => {
    let state = cartReducer({ lines: [] }, { type: 'ADD_ITEM', payload: sampleLine });
    state = cartReducer(state, {
      type: 'SET_QUANTITY',
      payload: { productId: 'p1', quantity: 5 },
    });

    expect(state.lines[0].quantity).toBe(5);
  });

  it('removes the item when its quantity is set to zero', () => {
    let state = cartReducer({ lines: [] }, { type: 'ADD_ITEM', payload: sampleLine });
    state = cartReducer(state, {
      type: 'SET_QUANTITY',
      payload: { productId: 'p1', quantity: 0 },
    });

    expect(state.lines).toHaveLength(0);
  });

  it('removes an item explicitly', () => {
    let state = cartReducer({ lines: [] }, { type: 'ADD_ITEM', payload: sampleLine });
    state = cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId: 'p1' } });

    expect(state.lines).toHaveLength(0);
  });

  it('clears the entire cart', () => {
    let state = cartReducer({ lines: [] }, { type: 'ADD_ITEM', payload: sampleLine });
    state = cartReducer(state, { type: 'CLEAR' });

    expect(state.lines).toHaveLength(0);
  });
});

describe('useCart / CartProvider', () => {
  it('throws when used outside a CartProvider', () => {
    // Suppress the expected error boundary logging for this negative test case.
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider',
    );

    consoleSpy.mockRestore();
  });

  it('hydrates initial state from localStorage', () => {
    window.localStorage.setItem(
      'shopsphere_cart',
      JSON.stringify([
        {
          productId: 'p9',
          name: 'Preloaded item',
          priceCents: 500,
          imageUrl: '/x.jpg',
          quantity: 3,
        },
      ]),
    );

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0].productId).toBe('p9');
    expect(result.current.itemCount).toBe(3);
  });

  it('persists cart changes to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addItem(sampleLine);
    });

    const stored = JSON.parse(window.localStorage.getItem('shopsphere_cart') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].productId).toBe('p1');
  });

  it('computes subtotal and item count across multiple lines', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addItem({ ...sampleLine, priceCents: 1000, quantity: 2 });
      result.current.addItem({
        productId: 'p2',
        name: 'Second product',
        priceCents: 500,
        imageUrl: '/second.jpg',
        quantity: 1,
      });
    });

    expect(result.current.subtotalCents).toBe(2500); // (1000 * 2) + (500 * 1)
    expect(result.current.itemCount).toBe(3);
  });

  it('removes and updates quantities through the hook API', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addItem(sampleLine);
    });
    act(() => {
      result.current.setQuantity('p1', 5);
    });
    expect(result.current.lines[0].quantity).toBe(5);

    act(() => {
      result.current.removeItem('p1');
    });
    expect(result.current.lines).toHaveLength(0);
  });

  it('clears the cart through the hook API', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addItem(sampleLine);
      result.current.clearCart();
    });

    expect(result.current.lines).toHaveLength(0);
  });
});
