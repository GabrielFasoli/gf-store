export const formatearPrecio = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);

export const ProductsFilterTag = (productos, tag) => {
  return productos.filter((p) => p.tags?.includes(tag));
};
