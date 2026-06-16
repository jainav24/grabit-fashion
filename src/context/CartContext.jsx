import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingItemIndex > -1) {
      setCart(prevCart => {
        const newCart = [...prevCart];
        const index = prevCart.findIndex(
          item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );
        if (index > -1) {
          newCart[index].quantity += quantity;
        }
        return newCart;
      });
      toast.success(`${product.name} Added`);
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity, selectedSize: size, selectedColor: color }]);
      toast.success(`${product.name} Added`);
    }
  };

  const removeFromCart = (productId, size = null, color = null) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
    ));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(
        item => item.id === productId && item.selectedSize === size && item.selectedColor === color
      );
      if (itemIndex > -1) {
        newCart[itemIndex].quantity = newQuantity;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
