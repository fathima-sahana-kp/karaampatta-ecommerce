
"use client";

import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Cart loading error:", error);
    }
    setIsLoaded(true);
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return currentCart.map((item) => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) => currentCart.map((item) => item.id === productId ? { ...item, quantity } : item));
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
