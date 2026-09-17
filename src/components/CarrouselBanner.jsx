import { Link } from "react-router-dom";
import { useState } from "react";
export const CarrouselBanner = ({ products, tag }) => {
  const [position, setPosition] = useState(0);
  const carouselProducts = products.slice(position, position + 3);

  const maxPosition = Math.max(products.length - 3, 0);
  const isStart = position === 0;
  const isEnd = position >= maxPosition;

  const next = () => {
    setPosition(Math.min(position + 3, maxPosition));
  };

  const prev = () => {
    setPosition(Math.max(position - 3, 0));
  };

  return (
    <section>
      <div className="carousel-looks-header">
        <h2> COMPRÁ EL LOOK </h2>
        <Link to={`/lookbook/${tag}`}>Ver todo</Link>
      </div>

      <div className="carousel-looks">
        <button
          className={`carousel-btn ${isStart ? "oculto" : ""}`}
          onClick={prev}
        >
          ←
        </button>

        <div className="looks-grid">
          {carouselProducts.map((p) => {
            return (
              <article className="carousel-card" key={p.id}>
                <img src={p.url} alt={p.name} />
              </article>
            );
          })}
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
