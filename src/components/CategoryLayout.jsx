import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsCards } from "./ProductsCards.jsx";
import { FilterSort } from "../pages/filterProducts/FilterSort.jsx";

export const CategoryLayout = ({ products, category, title }) => {
  const { subcategoria: subcategory } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = p.category === category;
    const matchesSubcategory = subcategory
      ? p.subcategory === subcategory
      : true;
    return matchesCategory && matchesSubcategory;
  });

  const [result, setResult] = useState(filteredProducts);

  return (
    <main className="main-container">
      <div className="category-header">
        <h1>{subcategory || title}</h1>
        <button
          className="btn-open-filters"
          onClick={() => setFiltersOpen(true)}
        >
          Filtrar y ordenar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="21" y1="4" x2="14" y2="4" />
            <line x1="10" y1="4" x2="3" y2="4" />
            <line x1="21" y1="12" x2="12" y2="12" />
            <line x1="8" y1="12" x2="3" y2="12" />
            <line x1="21" y1="20" x2="16" y2="20" />
            <line x1="12" y1="20" x2="3" y2="20" />
            <circle cx="14" cy="4" r="2" />
            <circle cx="8" cy="12" r="2" />
            <circle cx="16" cy="20" r="2" />
          </svg>
        </button>
      </div>

      <section className="products-grid">
        {result.length > 0 ? (
          <ProductsCards products={result} />
        ) : (
          <p className="error-msg">No se encontraron productos</p>
        )}
      </section>

      <div
        className={`overlay ${filtersOpen ? "active" : ""}`}
        onClick={() => setFiltersOpen(false)}
      ></div>

      <FilterSort
        baseProducts={filteredProducts}
        category={category}
        subcategory={subcategory}
        onResult={setResult}
        onClose={() => setFiltersOpen(false)}
        open={filtersOpen}
      />
    </main>
  );
};
