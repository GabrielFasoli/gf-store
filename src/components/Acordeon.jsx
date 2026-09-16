import { useState } from "react";
export const Acordeon = ({ titulo, children }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="acordeon">
      <button
        className="acordeon-header"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
      >
        <span>{titulo}</span>
        <span className="acordeon-icono">
          {abierto ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </span>
      </button>

      {abierto && <div className="acordeon-contenido">{children}</div>}
    </div>
  );
};
