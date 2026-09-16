import { NavLink } from "react-router-dom";
import { categorias } from "../../data/categorias";
import logo from "../../assets/logo.svg";
import { UserMenu } from "../UserMenu";
import "./Nav.css";

export const DesktopNav = ({ carrito, toggleCarrito }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} alt="GFStore" />
        </NavLink>
      </div>

      <ul className="navbar-links">
        {categorias.map((categoria) => (
          <li className="nav-item" key={categoria.nombre}>
            <NavLink to={categoria.path} className="nav-category-link">
              {categoria.nombre}
            </NavLink>

            <div className="mega-menu">
              <div className="mega-menu-content">
                {categoria.columnas.map((columna) => (
                  <div className="mega-menu-column" key={columna.titulo}>
                    <h3>{columna.titulo}</h3>

                    <ul>
                      {columna.links.map((link) => (
                        <li key={link.path}>
                          <NavLink to={link.path}>{link.nombre}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <UserMenu></UserMenu>
      <button
        type="button"
        className="carrito-btn"
        onClick={toggleCarrito}
        aria-label="Abrir carrito"
      >
        <svg
          className="nav-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path>
        </svg>
        <span
          className={`carrito-badge ${carrito.length > 0 ? "visible" : ""}`}
        >
          {carrito.length}
        </span>
      </button>
      <NavLink to={"/admin"}>Cargar Producto</NavLink>
    </nav>
  );
};
