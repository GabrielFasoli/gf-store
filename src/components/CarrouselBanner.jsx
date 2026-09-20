import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(() => {
    if (window.innerWidth <= 500) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) setItemsPerView(1);
      else if (window.innerWidth <= 900) setItemsPerView(2);
      else setItemsPerView(3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerView;
};

export const CarrouselBanner = ({ products, tag }) => {
  const itemsPerView = useItemsPerView();
  const [position, setPosition] = useState(0);
  const carouselProducts = products.slice(position, position + itemsPerView);

  const maxPosition = Math.max(products.length - itemsPerView, 0);
  const isStart = position === 0;
  const isEnd = position >= maxPosition;

  const next = () => {
    setPosition(Math.min(position + itemsPerView, maxPosition));
  };

  const prev = () => {
    setPosition(Math.max(position - itemsPerView, 0));
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
