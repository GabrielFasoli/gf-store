import { useState } from "react";
import { Link } from "react-router-dom";

const STORE_NAME = "GF Store";

const HELP_LINKS = [
  { label: "Contactanos", to: "/contacto" },
  { label: "Métodos de pago", to: "/metodos-de-pago" },
  { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
  { label: "Seguí tu envío", to: "/seguimiento" },
  { label: "Términos y condiciones de uso", to: "/terminos" },
  { label: "Defensa de las y los consumidores", to: "/defensa-del-consumidor" },
];

const SERVICES_LINKS = [
  { label: "Tiendas", to: "/tiendas" },
  { label: "Cambios y devoluciones", to: "/cambios" },
  { label: "Cuidado de los productos", to: "/cuidado" },
  { label: "Guía de talles", to: "/guia-de-talles" },
  { label: "Política de privacidad", to: "/privacidad" },
];

const ABOUT_LINKS = [
  { label: "Quiénes somos", to: "/nosotros" },
  { label: "Novedades", to: "/novedades" },
  { label: "Empleo", to: "/empleo" },
];

const LEGAL_LINKS = [
  { label: "Términos y condiciones", to: "/terminos" },
  { label: "Política de privacidad", to: "/privacidad" },
  { label: "Configurar cookies", to: "/cookies" },
];

const PAYMENTS = ["VISA", "Mastercard", "Amex", "Mercado Pago"];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

function FooterLinks({ links }) {
  return (
    <ul>
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link to={to}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // acá va la llamada a tu API o servicio de newsletter
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column">
          <h3>Ayuda</h3>
          <FooterLinks links={HELP_LINKS} />
          <Link to="/arrepentimiento" className="footer-regret">
            Botón de arrepentimiento
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </Link>
        </div>

        <div className="footer-column">
          <h3>Servicios</h3>
          <FooterLinks links={SERVICES_LINKS} />
        </div>

        <div className="footer-column">
          <h3>Acerca de {STORE_NAME}</h3>
          <FooterLinks links={ABOUT_LINKS} />
        </div>

        <div className="footer-column footer-newsletter">
          <h3>Mantenete al día</h3>
          <p>Inscribite y obtené 15% OFF en tu primera compra</p>

          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Ingresá tu correo electrónico"
              aria-label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Suscribirme</button>
          </form>

          {subscribed && (
            <p className="footer-success" role="status">
              ¡Listo! Ya estás suscripto.
            </p>
          )}

          <div className="footer-socials">
            {SOCIALS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <nav>
            {LEGAL_LINKS.map(({ label, to }) => (
              <Link key={label} to={to}>
                {label}
              </Link>
            ))}
          </nav>
          <p>
            ©{STORE_NAME}, {new Date().getFullYear()}. Todos los derechos
            reservados
          </p>
        </div>

        <ul className="footer-payments">
          {PAYMENTS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
