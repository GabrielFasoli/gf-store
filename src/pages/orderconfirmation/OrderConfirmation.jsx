import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { createOrder } from "../../service/products.js";
import { formatPrice } from "../../logic/utils.js";
import { FREE_SHIPPING_THRESHOLD } from "../../config/shipping.js";

const STANDARD_DELIVERY_COST = 10000;

export function OrderConfirmation({ cart, calculateTotal, clearCart }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = calculateTotal();

  // Step 1 — address (with localStorage)
  const [addressForm, setAddressForm] = useState(() => {
    const saved = localStorage.getItem("addressForm");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          phone: "",
          address: "",
          number: "",
          floor: "",
          city: "",
          instructions: "",
          document: "",
          adult: false,
        };
  });
  const [addressConfirmed, setAddressConfirmed] = useState(() => {
    return localStorage.getItem("addressForm") !== null;
  });

  // Step 2 — delivery
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  // Step 3 — payment
  const [cardForm, setCardForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [cardErrors, setCardErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [orderId]);

  // ---------- Step 1 ----------
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.adult) {
      alert("Tenés que confirmar que sos mayor de 18 años");
      return;
    }
    localStorage.setItem("addressForm", JSON.stringify(addressForm));
    setAddressConfirmed(true);
  };

  // ---------- Step 2 ----------
  let deliveryCost;
  if (deliveryOption === "store") {
    deliveryCost = 0;
  } else if (deliveryOption === "pickup-point") {
    deliveryCost = 0;
  } else {
    deliveryCost =
      total >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_DELIVERY_COST;
  }

  const handleDeliveryConfirm = () => {
    if (!deliveryOption) {
      alert("Elegí una opción de entrega");
      return;
    }
    setDeliveryConfirmed(true);
  };

  // ---------- Step 3 ----------
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateCard = () => {
    const errors = {};
    if (!cardForm.name.trim()) errors.name = "Ingresá el nombre del titular";

    const digits = cardForm.number.replace(/\s/g, "");
    if (digits.length !== 16 || isNaN(digits))
      errors.number = "El número debe tener 16 dígitos";

    const [mm, aa] = cardForm.expiry.split("/").map((v) => v?.trim());
    const month = Number(mm);
    const year = Number(aa);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (!month || !year || month < 1 || month > 12) {
      errors.expiry = "Formato inválido (MM/AA)";
    } else if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      errors.expiry = "La tarjeta está vencida";
    }

    if (!/^\d{3,4}$/.test(cardForm.cvv)) errors.cvv = "CVV inválido";

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!validateCard()) return;

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        buyerEmail: user.email,
        buyerName: `${addressForm.firstName} ${addressForm.lastName}`,
        phone: addressForm.phone,
        address: `${addressForm.address} ${addressForm.number}`,
        floor: addressForm.floor || null,
        city: addressForm.city,
        instructions: addressForm.instructions || null,
        document: addressForm.document,
        deliveryOption,
        deliveryCost,
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size || null,
          color: item.color || null,
          quantity: item.quantity,
          price: item.price,
        })),
        total: total + deliveryCost,
      };

      const { id } = await createOrder(orderData);
      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error(err);
      setError("Hubo un error al generar tu orden. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Success screen ----------
  if (orderId) {
    return (
      <div className="order-success-overlay">
        <div className="order-success-card">
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
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu orden fue generada con éxito.</p>
          <p className="order-id">
            N° de orden: <strong>{orderId}</strong>
          </p>
          <p className="redirect-hint">
            Te redirigimos al inicio en unos segundos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="main-container order-confirmation-page">
      <div className="order-grid">
        <div className="order-form-col">
          <section className="order-section">
            <h2>Mis datos</h2>
            <p className="order-user-email">{user.email}</p>
          </section>

          {!addressConfirmed ? (
            <section className="order-section">
              <h2>Dirección de entrega</h2>
              <form onSubmit={handleAddressSubmit} className="address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Nombre</label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={addressForm.firstName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Apellido</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={addressForm.lastName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="+54 221 ..."
                    value={addressForm.phone}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                      id="address"
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number">Altura</label>
                    <input
                      id="number"
                      name="number"
                      value={addressForm.number}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="floor">Piso / Departamento</label>
                    <input
                      id="floor"
                      name="floor"
                      value={addressForm.floor}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Localidad</label>
                    <input
                      id="city"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="instructions">Instrucciones de entrega</label>
                  <input
                    id="instructions"
                    name="instructions"
                    placeholder="Opcional"
                    value={addressForm.instructions}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="document">DNI</label>
                  <input
                    id="document"
                    name="document"
                    placeholder="12345678"
                    value={addressForm.document}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="adult"
                    checked={addressForm.adult}
                    onChange={handleAddressChange}
                  />
                  Soy mayor de 18 años
                </label>

                <button type="submit" className="btnAdd">
                  Siguiente
                </button>
              </form>
            </section>
          ) : (
            <section className="order-section summary-card">
              <div className="summary-card-header">
                <h2>Dirección de entrega</h2>
                <button
                  className="link-btn"
                  onClick={() => setAddressConfirmed(false)}
                >
                  Modificar
                </button>
              </div>
              <p>
                <strong>
                  {addressForm.firstName} {addressForm.lastName}
                </strong>
              </p>
              <p>
                {addressForm.address} {addressForm.number}{" "}
                {addressForm.floor && `, ${addressForm.floor}`}
              </p>
              <p>{addressForm.city}</p>
              <p>{addressForm.phone}</p>
              <p>DNI: {addressForm.document}</p>
            </section>
          )}

          <section
            className={`order-section ${!addressConfirmed ? "locked" : ""}`}
          >
            <h2>Opciones de entrega</h2>

            {!addressConfirmed ? (
              <p className="locked-hint">
                Completá tu dirección para continuar
              </p>
            ) : deliveryConfirmed ? (
              <div className="summary-card">
                <div className="summary-card-header">
                  <p>
                    <strong>
                      {deliveryOption === "store"
                        ? "Retirar en sucursal"
                        : deliveryOption === "pickup-point"
                          ? "Punto de retiro"
                          : "Entrega a domicilio"}
                    </strong>
                  </p>
                  <button
                    className="link-btn"
                    onClick={() => setDeliveryConfirmed(false)}
                  >
                    Modificar
                  </button>
                </div>
                <p>
                  {deliveryCost === 0
                    ? "Gratis"
                    : formatPrice(deliveryCost)}
                </p>
              </div>
            ) : (
              <>
                <label
                  className={`delivery-option ${deliveryOption === "standard" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === "standard"}
                    onChange={() => setDeliveryOption("standard")}
                  />
                  <div>
                    <p className="delivery-title">Entrega a domicilio</p>
                    <p className="delivery-detail">3 a 5 días hábiles</p>
                  </div>
                  <span className="delivery-price">
                    {total >= FREE_SHIPPING_THRESHOLD
                      ? "Gratis"
                      : formatPrice(STANDARD_DELIVERY_COST)}
                  </span>
                </label>

                <label
                  className={`delivery-option ${deliveryOption === "pickup-point" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === "pickup-point"}
                    onChange={() => setDeliveryOption("pickup-point")}
                  />
                  <div>
                    <p className="delivery-title">Punto de retiro</p>
                    <p className="delivery-detail">
                      Sucursal Pickit — Calle 525 e/ 20 y 21, La Plata
                    </p>
                  </div>
                  <span className="delivery-price">Gratis</span>
                </label>

                <label
                  className={`delivery-option ${deliveryOption === "store" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === "store"}
                    onChange={() => setDeliveryOption("store")}
                  />
                  <div>
                    <p className="delivery-title">Retirar en sucursal</p>
                    <p className="delivery-detail">
                      GF Store — Calle 7 e/ 50 y 51, La Plata
                    </p>
                  </div>
                  <span className="delivery-price">Gratis</span>
                </label>

                <button className="btnAdd" onClick={handleDeliveryConfirm}>
                  Siguiente
                </button>
              </>
            )}
          </section>

          <section
            className={`order-section ${!deliveryConfirmed ? "locked" : ""}`}
          >
            <h2>Datos de la tarjeta</h2>

            {!deliveryConfirmed ? (
              <p className="locked-hint">
                Elegí una opción de entrega para continuar
              </p>
            ) : (
              <form onSubmit={handleFinalSubmit} className="address-form">
                <div className="form-group">
                  <label htmlFor="cardName">Titular de la tarjeta</label>
                  <input
                    id="cardName"
                    name="name"
                    value={cardForm.name}
                    onChange={handleCardChange}
                  />
                  {cardErrors.name && (
                    <p className="field-error">{cardErrors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Número</label>
                  <input
                    id="cardNumber"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    value={cardForm.number}
                    onChange={handleCardChange}
                  />
                  {cardErrors.number && (
                    <p className="field-error">{cardErrors.number}</p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">MM/AA</label>
                    <input
                      id="cardExpiry"
                      name="expiry"
                      placeholder="12/28"
                      value={cardForm.expiry}
                      onChange={handleCardChange}
                    />
                    {cardErrors.expiry && (
                      <p className="field-error">{cardErrors.expiry}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      id="cardCvv"
                      name="cvv"
                      placeholder="123"
                      value={cardForm.cvv}
                      onChange={handleCardChange}
                    />
                    {cardErrors.cvv && (
                      <p className="field-error">{cardErrors.cvv}</p>
                    )}
                  </div>
                </div>

                {error && <p className="error-msg">{error}</p>}

                <button
                  type="submit"
                  className="btnAdd"
                  disabled={loading}
                >
                  {loading ? "Confirmando..." : "Finalizar compra"}
                </button>
              </form>
            )}
          </section>
        </div>

        <aside className="checkout-summary">
          <h2>Resumen de tu pedido ({cart.length})</h2>

          {cart.map((product) => (
            <div className="order-summary-item" key={product.id}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="order-summary-img"
              />
              <div>
                <p className="order-summary-name">{product.name}</p>
                {product.color && (
                  <p className="checkout-detail">Color: {product.color}</p>
                )}
                {product.size && (
                  <p className="checkout-detail">Talle: {product.size}</p>
                )}
                <p className="checkout-detail">
                  Cantidad: {product.quantity}
                </p>
              </div>
              <p className="price">
                {formatPrice(product.price * product.quantity)}
              </p>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="summary-row">
            <span>Entrega</span>
            <span>
              {deliveryConfirmed
                ? deliveryCost === 0
                  ? "Gratis"
                  : formatPrice(deliveryCost)
                : "A calcular"}
            </span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>
              {formatPrice(total + (deliveryConfirmed ? deliveryCost : 0))}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
