import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of one order
export interface Order {
  id: string;
  image: any;
  name: string;
  status: string;
  delivery: string;
  size: string;
  qty: number;
  price: number;
  date: string;
}

// Define the shape of the context value
interface OrderContextType {
  activeOrders: Order[];
  orderHistory: Order[];
  placeOrder: (product: any) => void;
  completeOrder: (orderId: string) => void;
}

// ✅ Create the context with an explicit type
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// ✅ Provider Component
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const placeOrder = (product: any) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      image: product.image,
      name: product.name,
      status: "Order Placed",
      delivery: "Delivery in 2 Hours",
      size: product.size || "L",
      qty: product.qty || 1,
      price: product.price,
      date: new Date().toLocaleString(),
    };
    setActiveOrders((prev) => [...prev, newOrder]);
  };

  const completeOrder = (orderId: string) => {
    const completed = activeOrders.find((order) => order.id === orderId);
    if (completed) {
      setOrderHistory((prev) => [...prev, { ...completed, status: "Delivered" }]);
      setActiveOrders((prev) => prev.filter((order) => order.id !== orderId));
    }
  };

  return (
    <OrderContext.Provider value={{ activeOrders, orderHistory, placeOrder, completeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Custom Hook for using the context
export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
