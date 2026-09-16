import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsCards } from "./ProductsCards.jsx";
import { FilterSort } from "../pages/filterProducts/FilterSort.jsx";

export const CategoriaLayout = ({ productos, categoria, titulo }) => {
  const { subcategoria } = useParams();
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = p.categoria === categoria;
    const coincideSubcategoria = subcategoria
      ? p.subcategoria === subcategoria
      : true;
    return coincideCategoria && coincideSubcategoria;
  });

  const [resultado, setResultado] = useState(productosFiltrados);

  return (
    <main className="contenedor-main">
      <div className="categoria-header">
        <h1>{subcategoria || titulo}</h1>
        <button
          className="btn-abrir-filtros"
          onClick={() => setFiltrosAbiertos(true)}
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

      <section className="grilla-productos">
        {resultado.length > 0 ? (
          <ProductsCards products={resultado} />
        ) : (
          <p className="error-msg">No se encontraron productos</p>
        )}
      </section>

      <div
        className={`overlay ${filtrosAbiertos ? "activo" : ""}`}
        onClick={() => setFiltrosAbiertos(false)}
      ></div>

      <FilterSort
        baseProducts={productosFiltrados}
        category={categoria}
        subcategory={subcategoria}
        onResult={setResultado}
        onClose={() => setFiltrosAbiertos(false)}
        abierto={filtrosAbiertos}
      />
    </main>
  );
};
