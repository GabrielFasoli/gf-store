import { useState } from "react";
import { ProductsCards } from "./ProductsCards.jsx";
export const CarrouselCard = ({ products }) => {
  const [position, setPosition] = useState(0);
  const carouselProducts = products.slice(position, position + 4);

  const maxPosition = Math.max(products.length - 4, 0);
  const isStart = position === 0;
  const isEnd = position >= maxPosition;

  const next = () => {
    setPosition(Math.min(position + 4, maxPosition));
  };

  const prev = () => {
    setPosition(Math.max(position - 4, 0));
  };
  return (
    <section>
      <div className="carousel-looks-header">
        <h2> Destacados </h2>
      </div>

      <div className="carousel-looks-cards">
        <button
          className={`carousel-btn ${isStart ? "oculto" : ""}`}
          onClick={prev}
        >
          ←
        </button>

        <div className="cards-grid">
          <ProductsCards products={carouselProducts} />
        </div>

        <button
          className={`carousel-btn ${isEnd ? "oculto" : ""}`}
          onClick={next}
        >
          →
        </button>
      </div>
    </section>
  );
};
