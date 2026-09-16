import { useNavigate } from "react-router-dom";
import { formatearPrecio } from "../../logic/utils.js";
import { FREE_SHIPPING_THRESHOLD } from "../../config/shipping.js";
import { useState, useEffect } from "react";
import { ProductsCards } from "../../components/ProductsCards.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginConGoogle } from "../../firebase/auth.js";

export function CheckoutPage({
  carrito,
  sumarProducts,
  restarProducts,
  eliminarProductos,
  calcularTotal,
  productos,
}) {
  const { user } = useAuth();

  const handlePagar = async () => {
    if (!user) return;
    navigate("/order-confirmation");
  };

  const handleLoginCheckout = async () => {
    try {
      await loginConGoogle();
    } catch (error) {
      console.error(error);
    }
  };
  const [recomendados, setRecomendados] = useState([]);

  useEffect(() => {
    if (productos.length > 0) {
      setRecomendados(
        [...productos].sort(() => Math.random() - 0.5).slice(0, 4),
      );
    }
  }, [productos]);
  const navigate = useNavigate();
  const total = calcularTotal();
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : 4500;
  const finalTotal = total + shippingCost;

  if (carrito.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-page-empty">
          <h1>
            Tu carrito{" "}
            <span className="items-count">
              ({carrito.length} producto{carrito.length !== 1 ? "s" : ""})
            </span>
          </h1>
          <p className="empty-cart-title">Tu carrito está vacío</p>
          <p className="empty-cart-subtitle">
            Una vez que añadas algo a tu carrito, aparecerá acá.
          </p>
          <button className="btn-empezar" onClick={() => navigate("/")}>
            Empezar
          </button>
        </div>
        <section className="checkout-recommendations">
          <h2>Nuestras recomendaciones</h2>
          <div className="cards-grid-small">
            <ProductsCards products={recomendados} />
          </div>
        </section>
      </main>
    );
  }
  return (
    <main className="contenedor-main checkout-page">
      <div className="checkout-grid">
        <div className="checkout-items">
          <h1>
            Tu carrito{" "}
            <span className="items-count">
              ({carrito.length} producto{carrito.length !== 1 ? "s" : ""})
            </span>
          </h1>

          {carrito.map((producto) => (
            <div className="checkout-item" key={producto.id}>
              <img
                src={producto.images[0]}
                alt={producto.name}
                className="checkout-item-img"
              />

              <div className="checkout-item-info">
                <div className="checkout-item-header">
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

                {producto.color && (
                  <p className="checkout-detalle">Color: {producto.color}</p>
                )}
                {producto.talle && (
                  <p className="checkout-detalle">Talle: {producto.talle}</p>
                )}

                <div className="checkout-item-footer">
                  <div className="quantity-controls">
                    <button
                      className="btn-decrease"
                      onClick={() => restarProducts(producto.id)}
                    >
                      −
                    </button>
                    <span>{producto.cantidad}</span>
                    <button
                      className="btn-increase"
                      onClick={() => sumarProducts(producto.id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="precio">
                    {formatearPrecio(producto.price * producto.cantidad)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="checkout-summary">
          <h2>Resumen del pedido</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatearPrecio(total)}</span>
          </div>

          <div className="summary-row">
            <span>Envío</span>
            <span>
              {shippingCost === 0 ? "Gratis" : formatearPrecio(shippingCost)}
            </span>
          </div>

          {shippingCost > 0 && (
            <p className="shipping-hint">
              🚚 Te faltan {formatearPrecio(FREE_SHIPPING_THRESHOLD - total)}{" "}
              para envío gratis
            </p>
          )}

          <details className="promo-code">
            <summary>Usar código promocional</summary>
            <input
              type="text"
              placeholder="Ingresá tu código"
              className="promo-input"
            />
          </details>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatearPrecio(finalTotal)}</span>
          </div>

          {user ? (
            <button className="btnAgregaar" onClick={handlePagar}>
              Ir a pagar
            </button>
          ) : (
            <div className="login-gate">
              <p>Iniciá sesión para continuar con tu compra</p>
              <button
                className="btn-google-checkout"
                onClick={handleLoginCheckout}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar con Google
              </button>
            </div>
          )}

          <div className="payment-icons">
            <span className="payment-label">Opciones de pago</span>
            <div className="payment-logos">
              <svg width="32" height="20" viewBox="0 0 32 20">
                <rect width="32" height="20" rx="3" fill="#1A1F71" />
                <text
                  x="16"
                  y="14"
                  fontSize="8"
                  fill="#fff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  VISA
                </text>
              </svg>
              <svg width="32" height="20" viewBox="0 0 32 20">
                <rect width="32" height="20" rx="3" fill="#EB001B" />
                <circle cx="12" cy="10" r="6" fill="#EB001B" />
                <circle cx="20" cy="10" r="6" fill="#F79E1B" opacity="0.8" />
              </svg>
            </div>
          </div>
        </aside>
      </div>
      <section className="checkout-recommendations">
        <h2>Nuestras recomendaciones</h2>
        <div className="cards-grid-small">
          <ProductsCards products={recomendados} />
        </div>
      </section>
    </main>
  );
}
