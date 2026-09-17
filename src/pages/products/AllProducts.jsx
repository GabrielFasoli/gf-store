import { ProductsCards } from "../../components/ProductsCards.jsx";

export function AllProducts({ products }) {
  return (
    <main className="main-container">
      <h1>Todos los productos</h1>
      <section className="products-grid">
        {products.length > 0 ? (
          <ProductsCards products={products} />
        ) : (
          <p className="error-msg">Cargando productos...</p>
        )}
      </section>
    </main>
  );
}
