import { useEffect, useState } from "react";
import { getProductsById } from "../service/products";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loanding, setLoanding] = useState(true);

  useEffect(() => {
    setLoanding(true);
    getProductsById(id).then((data) => {
      setProduct(data);
      setLoanding(false);
    });
  }, [id]);

  return { product, loanding };
}
