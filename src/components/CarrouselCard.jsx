import { useState, useEffect } from "react";
import { ProductsCards } from "./ProductsCards.jsx";

const BREAKPOINTS = [
  { query: "(min-width: 1101px)", count: 4 },
  { query: "(min-width: 801px)", count: 3 },
  { query: "(min-width: 501px)", count: 2 },
];

const getCount = () =>
  BREAKPOINTS.find((b) => window.matchMedia(b.query).matches)?.count ?? 1;

const useItemsPerPage = () => {
  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const queries = BREAKPOINTS.map((b) => window.matchMedia(b.query));
    const onChange = () => setCount(getCount());

    queries.forEach((mq) => mq.addEventListener("change", onChange));
    return () =>
      queries.forEach((mq) => mq.removeEventListener("change", onChange));
  }, []);

  return count;
};
export const CarrouselCard = ({ products }) => {
  const perPage = useItemsPerPage();
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(products.length - perPage, 0);
  const safePosition = Math.min(position, maxPosition);
  const carouselProducts = products.slice(safePosition, safePosition + perPage);

  const isStart = safePosition === 0;
  const isEnd = safePosition >= maxPosition;

  const next = () => setPosition(Math.min(safePosition + perPage, maxPosition));
  const prev = () => setPosition(Math.max(safePosition - perPage, 0));

  return (
    <section>
      <div className="carousel-looks-header">
        <h2>Destacados</h2>
      </div>

      <div className="carousel-looks-cards">
        <button
          className={`carousel-btn ${isStart ? "oculto" : ""}`}
          onClick={prev}
        >
          ←
        </button>

        <div
          className="cards-grid"
          style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}
        >
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
