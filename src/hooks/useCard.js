import { useState } from "react";

export function useCard() {
  const [carrito, setCarrito] = useState(() => {
    const productosLocalStorage = window.localStorage.getItem("carrito");
    return productosLocalStorage ? JSON.parse(productosLocalStorage) : [];
  });
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };
  const agregarProductos = (producto) => {
    let productoEnCarrito = carrito.find(
      (product) => product.id === producto.id,
    );

    let carritoNuevo;

    if (productoEnCarrito) {
      carritoNuevo = carrito.map((product) => {
        return product.id === producto.id
          ? { ...product, cantidad: product.cantidad + 1 }
          : product;
      });
    } else {
      carritoNuevo = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(carritoNuevo);
    localStorage.setItem("carrito", JSON.stringify(carritoNuevo));
  };

  const sumarProducts = (id) => {
    const sumaDeProductos = carrito.map((producto) => {
      return producto.id === id
        ? { ...producto, cantidad: producto.cantidad + 1 }
        : producto;
    });
    setCarrito(sumaDeProductos);
    localStorage.setItem("carrito", JSON.stringify(sumaDeProductos));
  };
  const restarProducts = (id) => {
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    let restaDeProductos;
    if (productoEnCarrito.cantidad > 1) {
      restaDeProductos = carrito.map((producto) => {
        return producto.id === id
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto;
      });
    } else {
      restaDeProductos = carrito.filter((producto) => producto.id !== id);
    }
    setCarrito(restaDeProductos);
    localStorage.setItem("carrito", JSON.stringify(restaDeProductos));
  };
  const eliminarProducto = (id) => {
    const eliminarproducto = carrito.filter((p) => p.id !== id);
    setCarrito(eliminarproducto);
    localStorage.setItem("carrito", JSON.stringify(eliminarproducto));
  };
  const calcularTotal = () => {
    return carrito.reduce((acc, { price, cantidad }) => {
      return acc + price * cantidad;
    }, 0);
  };
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };
  return {
    carrito,
    carritoAbierto,
    agregarProductos,
    sumarProducts,
    restarProducts,
    calcularTotal,
    toggleCarrito,
    eliminarProducto,
    vaciarCarrito,
  };
}
