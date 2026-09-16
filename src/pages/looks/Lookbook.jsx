import { useParams } from "react-router-dom";
import { ProductsFilterTag } from "../../logic/utils.js";
import { ProductsCards } from "../../components/ProductsCards";
export const Lookbook = ({ productos }) => {
  const { tag } = useParams();
  const productosDeLooks = ProductsFilterTag(productos, tag);
  return (
    <main className="contenedor-main">
      <h1>{tag}</h1>
      <section className="grilla-productos">
        {productosDeLooks.length > 0 ? (
          <ProductsCards products={productosDeLooks}></ProductsCards>
        ) : (
          <p className="error-msg">No se encontraron Productos</p>
        )}
      </section>
    </main>
  );
};
