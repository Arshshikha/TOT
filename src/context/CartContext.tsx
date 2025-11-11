import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Cart Item type
export interface CartItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: any;
  quantity: number;
  brand?: string; // unified key (not brandName)
  brandName?: string;
}

// ✅ Context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// ✅ Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    // ✅ Ensure ID and brand are always stable
    const id = item.id?.toString() || Math.random().toString();
    const brand =
  (item.brand || (item as any).brandName || "Unknown").toLowerCase().trim();


    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.id === id && cartItem.brand === brand
      );

      if (existingItem) {
        // ✅ If same item & brand exist → increase quantity
        return prev.map((cartItem) =>
          cartItem.id === id && cartItem.brand === brand
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // ✅ Add new item if not found
      const newItem: CartItem = { ...item, id, brand, quantity: 1 };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // remove if qty 0
      return updated;
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
