import { ProductsCards } from "../../components/ProductsCards.jsx";

export function AllProducts({ products }) {
  return (
    <main className="contenedor-main">
      <h1>Todos los productos</h1>
      <section className="grilla-productos">
        {products.length > 0 ? (
          <ProductsCards products={products} />
        ) : (
          <p className="error-msg">Cargando productos...</p>
        )}
      </section>
    </main>
  );
}
