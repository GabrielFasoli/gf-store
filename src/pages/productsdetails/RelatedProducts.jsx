import { ProductsCards } from "../../components/ProductsCards";
export const RelatedProducts = ({ products, category, subCategory }) => {
  const selectedProducts = products.filter((p) => {
    const categoryProducts = p.category === category;
    const subCategoryProducts = p.subcategory === subCategory;
    return categoryProducts && subCategoryProducts;
  });
  return (
    <section className="related-products">
      <h2>Productos Relacionados</h2>
      {selectedProducts.length > 0 ? (
        <div className="cards-grid-small">
          <ProductsCards products={selectedProducts}></ProductsCards>
        </div>
      ) : (
        <p>No se encontraron productos Relacionados</p>
      )}
    </section>
  );
};
