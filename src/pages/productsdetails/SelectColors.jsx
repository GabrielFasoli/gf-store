import { Link } from "react-router-dom";

export function SelectColor({ productos, productoActual }) {
  const variantes = productos.filter(
    (p) => p.colorGroup && p.colorGroup === productoActual.colorGroup,
  );

  if (variantes.length <= 1) return null;

  return (
    <div className="selector-colores">
      <p className="color-actual">Colores</p>
      <div className="colores-opciones">
        {variantes.map((v) => (
          <Link
            to={`/productsdetails/${v.id}`}
            key={v.id}
            className={`color-thumb ${v.id === productoActual.id ? "activo" : ""}`}
          >
            <img src={v.images[0]} alt={v.color} />
          </Link>
        ))}
      </div>
      <p className="color-actual">{productoActual.colorDisplay}</p>
    </div>
  );
}
