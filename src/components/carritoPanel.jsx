import { ProductsCarrito } from "./productsCarrito.jsx";
import { formatearPrecio } from "../logic/utils.js";
import { FREE_SHIPPING_THRESHOLD } from "../config/shipping.js";
import { useNavigate } from "react-router-dom";

export const CarritoPanel = ({
  carrito,
  carritoAbierto,
  toggleCarrito,
  sumarProducts,
  restarProducts,
  calcularTotal,
  eliminarProductos,
}) => {
  const total = calcularTotal();
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - total;
  const shippingProgress = Math.min(
    (total / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`overlay ${carritoAbierto ? "activo" : ""}`}
        onClick={toggleCarrito}
      ></div>

      <div className={`panel-carrito ${carritoAbierto ? "activo" : ""}`}>
        <header className="panel-header">
          <h2>Tu carrito</h2>
          <button className="btn-cerrar" onClick={toggleCarrito}>
            ✕
          </button>
        </header>

        {carrito.length > 0 ? (
          <>
            <div id="contCarrito">
              {carrito.map((producto) => (
                <ProductsCarrito
                  key={producto.id}
                  producto={producto}
                  sumar={sumarProducts}
                  restar={restarProducts}
                  eliminarProductos={eliminarProductos}
                />
              ))}
            </div>
            <p className="total-price">
              Total: <span>{formatearPrecio(total)}</span>
            </p>
            <footer id="totalCarrito">
              <div className="free-shipping-info">
                {amountToFreeShipping > 0 ? (
                  <p>
                    Te faltan{" "}
                    <strong>{formatearPrecio(amountToFreeShipping)}</strong>{" "}
                    para envío gratis
                  </p>
                ) : (
                  <p className="free-shipping-done">¡Tenés envío gratis! 🎉</p>
                )}

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${shippingProgress}%` }}
                  ></div>
                </div>

                <div className="progress-labels">
                  <span>{formatearPrecio(total)}</span>
                  <span>{formatearPrecio(FREE_SHIPPING_THRESHOLD)}</span>
                </div>
              </div>

              <button
                className="btnAgregaar"
                onClick={() => {
                  toggleCarrito();
                  navigate("/checkout");
                }}
              >
                Finalizar compra
              </button>
            </footer>
          </>
        ) : (
          <div className="empty-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <p>Tu carrito está vacío</p>
          </div>
        )}
      </div>
    </>
  );
};
