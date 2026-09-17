import { NavLink, Link } from "react-router-dom";
import { categories } from "../../data/categories";
import logo from "../../assets/logo.svg";
import { UserMenu } from "../UserMenu";
import { useAuth } from "../../context/AuthContext";
import { ADMIN_EMAILS } from "../../config/admins";
import "./Nav.css";

export const DesktopNav = ({ cart, toggleCart }) => {
  const { user } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} alt="GFStore" />
        </NavLink>
      </div>

      <ul className="navbar-links">
        {categories.map((category) => (
          <li className="nav-item" key={category.name}>
            <NavLink to={category.path} className="nav-category-link">
              {category.name}
            </NavLink>

            <div className="mega-menu">
              <div className="mega-menu-content">
                {category.columns.map((column) => (
                  <div className="mega-menu-column" key={column.title}>
                    <h3>{column.title}</h3>

                    <ul>
                      {column.links.map((link) => (
                        <li key={link.path}>
                          <NavLink to={link.path}>{link.name}</NavLink>
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
        className="cart-btn"
        onClick={toggleCart}
        aria-label="Abrir carrito"
      >
        <svg
          className="nav-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="#fffbfb"
          viewBox="0 0 256 256"
        >
          <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path>
        </svg>
        <span
          className={`cart-badge ${cart.length > 0 ? "visible" : ""}`}
        >
          {cart.length}
        </span>
      </button>
      {isAdmin && (
        <Link to="/admin" className="add-product">
          Cargar producto
        </Link>
      )}
    </nav>
  );
};
