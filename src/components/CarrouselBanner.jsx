import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";
export const CarrouselBanner = ({ productos, tag }) => {
  const [position, setPosition] = useState(0);
  const productosLooks = productos.slice(position, position + 3);

  const posicionMaxima = Math.max(productos.length - 3, 0);
  const esInicio = position === 0;
  const esFinal = position >= posicionMaxima;

  const avanzar = () => {
    setPosition(Math.min(position + 3, posicionMaxima));
  };

  const retroceder = () => {
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
          className={`carousel-btn ${esInicio ? "oculto" : ""}`}
          onClick={retroceder}
        >
          ←
        </button>

        <div className="looks-grid">
          {productosLooks.map((p) => {
            return (
              <article className="carousel-card" key={p.id}>
                <img src={p.url} alt={p.name} />
              </article>
            );
          })}
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
