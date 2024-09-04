import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const initialCart = () : CartItem[] => {
    const localeStorageCart = localStorage.getItem("cart");
    return localeStorageCart ? JSON.parse(localeStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.getItem("cart");
  }, []);

  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex((guitar) => guitar.id == item.id);
    if (itemExists >= 0) {
      //elemento existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      const newItem : CartItem = {...item, quantity : 1}
      setCart([...cart, newItem]); // generamos la copia de carrito y agregamos el nuevo
      console.log(cart);
    }
  }

  function removeFromCart(id : Guitar['id']) { // en este caso se usa lookUp, seleccionamos solo un atributo del type Guitar en este caso el id
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id : Guitar['id']) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function decreaseQuantity(id : Guitar['id']) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }

  // State Derivado
  const isEmply = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmply,
    cartTotal
  };
};
