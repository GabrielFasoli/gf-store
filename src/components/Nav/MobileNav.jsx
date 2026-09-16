import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { categorias } from "../../data/categorias";
import { useClickOutside } from "../../hooks/useClickOutside";
import { UserMenu } from "../UserMenu";
import logo from "../../assets/logo.svg";

export const MobileNav = ({ carrito, toggleCarrito }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const navRef = useRef(null);

  useClickOutside(navRef, () => {
    setMenuAbierto(false);
    setCategoriaAbierta(null);
  });

  const cerrarMenu = () => {
    setMenuAbierto(false);
    setCategoriaAbierta(null);
  };

  const toggleCategoria = (nombre) => {
    setCategoriaAbierta((categoriaActual) =>
      categoriaActual === nombre ? null : nombre,
    );
  };

  return (
    <nav className="mobile-nav" ref={navRef}>
      <NavLink to="/" className="mobile-logo" onClick={cerrarMenu}>
        <img src={logo} alt="GFStore" />
      </NavLink>
      <UserMenu></UserMenu>
      <div className="mobile-actions">
        <button
          type="button"
          className="carrito-btn"
          onClick={toggleCarrito}
          aria-label="Abrir carrito"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path>
          </svg>
          <span className={`carrito-badge ${carrito.length ? "visible" : ""}`}>
            {carrito.length}
          </span>
        </button>

        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          ☰
        </button>
      </div>

      {menuAbierto && (
        <div className="mobile-menu">
          <ul>
            {categorias.map((categoria) => (
              <li className="mobile-menu-item" key={categoria.nombre}>
                <button
                  type="button"
                  className="mobile-category-btn"
                  onClick={() => toggleCategoria(categoria.nombre)}
                  aria-expanded={categoriaAbierta === categoria.nombre}
                >
                  {categoria.nombre}
                </button>

                {categoriaAbierta === categoria.nombre && (
                  <div className="mobile-submenu">
                    <NavLink
                      className="ver-todo-link"
                      to={categoria.path}
                      onClick={cerrarMenu}
                    >
                      Ver todo {categoria.nombre}
                    </NavLink>

                    {categoria.columnas.map((columna) => (
                      <div className="mobile-column" key={columna.titulo}>
                        <h3>{columna.titulo}</h3>

                        {columna.links.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={cerrarMenu}
                          >
                            {link.nombre}
                          </NavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
