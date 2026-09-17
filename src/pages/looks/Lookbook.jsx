import { useParams } from "react-router-dom";
import { ProductsFilterTag } from "../../logic/utils.js";
import { ProductsCards } from "../../components/ProductsCards";
export const Lookbook = ({ products }) => {
  const { tag } = useParams();
  const lookProducts = ProductsFilterTag(products, tag);
  return (
    <main className="main-container">
      <h1>{tag}</h1>
      <section className="products-grid">
        {lookProducts.length > 0 ? (
          <ProductsCards products={lookProducts}></ProductsCards>
        ) : (
          <p className="error-msg">No se encontraron Productos</p>
        )}
      </section>
    </main>
  );
};
