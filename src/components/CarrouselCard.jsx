import { useState } from "react";
import { ProductsCards } from "./ProductsCards.jsx";
export const CarrouselCard = ({ productos }) => {
  const [position, setPosition] = useState(0);
  const productosCarrousel = productos.slice(position, position + 4);

  const posicionMaxima = Math.max(productos.length - 4, 0);
  const esInicio = position === 0;
  const esFinal = position >= posicionMaxima;

  const avanzar = () => {
    setPosition(Math.min(position + 4, posicionMaxima));
  };

  const retroceder = () => {
    setPosition(Math.max(position - 4, 0));
  };
  return (
    <section>
      <div className="carousel-looks-header">
        <h2> Destacados </h2>
      </div>

      <div className="carousel-looks-cards">
        <button
          className={`carousel-btn ${esInicio ? "oculto" : ""}`}
          onClick={retroceder}
        >
          ←
        </button>

        <div className="cards-grid">
          <ProductsCards products={productosCarrousel} />
        </div>

        <button
          className={`carousel-btn ${esFinal ? "oculto" : ""}`}
          onClick={avanzar}
        >
          →
        </button>
      </div>
    </section>
  );
};
