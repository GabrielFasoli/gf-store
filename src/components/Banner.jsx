import { Link } from "react-router-dom";
import "../index.css";
export const Banner = ({ posicion, titulo, subtitulo, imagen, botones }) => {
  return (
    <section className="banner-style">
      <img src={imagen} alt={titulo} />
      <div className={`banner-contenido posicion-${posicion}`}>
        <h2 className={`titulo-${posicion}`}>{titulo}</h2>
        {subtitulo && <h3 className={`subtitulo-${posicion}`}>{subtitulo}</h3>}
        <div className="banner-botones">
          {botones.map((btn) => {
            return (
              <Link
                className={`banner-btn-${posicion}`}
                to={btn.link}
                key={btn.titulo}
              >
                {btn.titulo}{" "}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
