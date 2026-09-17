import { useState } from "react";

export function useCard() {
  const [cart, setCart] = useState(() => {
    const cartLocalStorage = window.localStorage.getItem("carrito");
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };
  const addProduct = (product) => {
    let productInCart = cart.find(
      (p) => p.id === product.id,
    );

    let newCart;

    if (productInCart) {
      newCart = cart.map((p) => {
        return p.id === product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p;
      });
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem("carrito", JSON.stringify(newCart));
  };

  const increaseProduct = (id) => {
    const increasedCart = cart.map((product) => {
      return product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    });
    setCart(increasedCart);
    localStorage.setItem("carrito", JSON.stringify(increasedCart));
  };
  const decreaseProduct = (id) => {
    const productInCart = cart.find((product) => product.id === id);
    let decreasedCart;
    if (productInCart.quantity > 1) {
      decreasedCart = cart.map((product) => {
        return product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
    } else {
      decreasedCart = cart.filter((product) => product.id !== id);
    }
    setCart(decreasedCart);
    localStorage.setItem("carrito", JSON.stringify(decreasedCart));
  };
  const removeProduct = (id) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    setCart(updatedCart);
    localStorage.setItem("carrito", JSON.stringify(updatedCart));
  };
  const calculateTotal = () => {
    return cart.reduce((acc, { price, quantity }) => {
      return acc + price * quantity;
    }, 0);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("carrito");
  };
  return {
    cart,
    cartOpen,
    addProduct,
    increaseProduct,
    decreaseProduct,
    calculateTotal,
    toggleCart,
    removeProduct,
    clearCart,
  };
}
