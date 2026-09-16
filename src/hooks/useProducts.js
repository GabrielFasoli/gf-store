import { useState, useEffect } from "react";
import { getProducts } from "../service/products.js";

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return { products };
}
