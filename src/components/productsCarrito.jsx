import { formatearPrecio } from "../logic/utils.js";

export const ProductsCarrito = ({
  producto,
  sumar,
  restar,
  eliminarProductos,
}) => {
  return (
    <article className="carrito-item">
      <div className="carrito-item-header">
        <h3>{producto.name}</h3>
        <button
          onClick={() => eliminarProductos(producto.id)}
          className="btn-basura"
          aria-label={`Eliminar ${producto.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      <div className="carrito-item-body">
        <img
          src={producto.images[0]}
          alt={producto.alt}
          className="carrito-item-img"
        />

        <div className="carrito-item-info">
          {producto.talle && (
            <p className="carrito-talle">Talle: {producto.talle}</p>
          )}
          <p className="precio">
            {formatearPrecio(producto.price * producto.cantidad)}
          </p>

          <div className="quantity-controls">
            <button
              className="btn-decrease"
              onClick={() => restar(producto.id)}
            >
              −
            </button>
            <span>{producto.cantidad}</span>
            <button className="btn-increase" onClick={() => sumar(producto.id)}>
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
