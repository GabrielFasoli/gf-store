import { Link } from "react-router-dom";

export function SelectColor({ products, currentProduct }) {
  const variants = products.filter(
    (p) => p.colorGroup && p.colorGroup === currentProduct.colorGroup,
  );

  if (variants.length <= 1) return null;

  return (
    <div className="color-selector">
      <p className="current-color">Colores</p>
      <div className="color-options">
        {variants.map((v) => (
          <Link
            to={`/productsdetails/${v.id}`}
            key={v.id}
            className={`color-thumb ${v.id === currentProduct.id ? "active" : ""}`}
          >
            <img src={v.images[0]} alt={v.color} />
          </Link>
        ))}
      </div>
      <p className="current-color">{currentProduct.colorDisplay}</p>
    </div>
  );
}
