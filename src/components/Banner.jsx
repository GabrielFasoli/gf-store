import { Link } from "react-router-dom";
export const Banner = ({ position, title, subtitle, image, buttons }) => {
  return (
    <section className="banner-style">
      <img src={image} alt={title} />
      <div className={`banner-content posicion-${position}`}>
        <h2 className={`titulo-${position}`}>{title}</h2>
        {subtitle && <h3 className={`subtitulo-${position}`}>{subtitle}</h3>}
        <div className="banner-buttons">
          {buttons.map((btn) => {
            return (
              <Link
                className={`banner-btn-${position}`}
                to={btn.link}
                key={btn.title}
              >
                {btn.title}{" "}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
