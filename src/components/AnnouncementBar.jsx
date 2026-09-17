import { useState, useEffect } from "react";

const messages = [
  " 🚚 Envío gratis a partir de $180.000",
  "💳 Hasta 12 cuotas sin interés",
  "🔥 Descubrí las nuevas colecciones",
  "💸 Ofertas exclusivas online",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-bar">
      <p>{messages[index]}</p>
    </div>
  );
}
