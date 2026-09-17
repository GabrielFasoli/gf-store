import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { loginConGoogle, logout } from "../firebase/auth.js";
import { useClickOutside } from "../hooks/useClickOutside.js";

export function UserMenu() {
  const { user } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setAbierto(false));

  const handleGoogle = async () => {
    try {
      await loginConGoogle();
      setAbierto(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-btn" onClick={() => setAbierto(!abierto)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="#fefcfc"
          viewBox="0 0 256 256"
        >
          <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
        </svg>
      </button>

      {abierto && (
        <div className="user-dropdown">
          {user ? (
            <>
              <div className="user-dropdown-info">
                <p className="user-name">{user.displayName}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <button className="dropdown-item">Mi cuenta</button>
              <button className="dropdown-item">Favoritos</button>
              <button
                className="dropdown-btn dropdown-btn-dark"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="dropdown-btn dropdown-btn-dark"
              onClick={handleGoogle}
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
          )}
        </div>
      )}
    </div>
  );
}
