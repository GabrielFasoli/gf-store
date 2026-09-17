import { formatPrice } from "../logic/utils.js";

export const ProductsCart = ({
  product,
  increase,
  decrease,
  removeProduct,
}) => {
  return (
    <article className="cart-item">
      <div className="cart-item-header">
        <h3>{product.name}</h3>
        <button
          onClick={() => removeProduct(product.id)}
          className="btn-trash"
          aria-label={`Eliminar ${product.name}`}
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

      <div className="cart-item-body">
        <img
          src={product.images[0]}
          alt={product.alt}
          className="cart-item-img"
        />

        <div className="cart-item-info">
          {product.size && (
            <p className="cart-size">Talle: {product.size}</p>
          )}
          <p className="price">
            {formatPrice(product.price * product.quantity)}
          </p>

          <div className="quantity-controls">
            <button
              className="btn-decrease"
              onClick={() => decrease(product.id)}
            >
              −
            </button>
            <span>{product.quantity}</span>
            <button className="btn-increase" onClick={() => increase(product.id)}>
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
