import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { categories } from "../../data/categories";
import { useClickOutside } from "../../hooks/useClickOutside";
import { UserMenu } from "../UserMenu";
import logo from "../../assets/logo.svg";

export const MobileNav = ({ cart, toggleCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const navRef = useRef(null);

  useClickOutside(navRef, () => {
    setMenuOpen(false);
    setOpenCategory(null);
  });

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenCategory(null);
  };

  const toggleCategory = (name) => {
    setOpenCategory((currentCategory) =>
      currentCategory === name ? null : name,
    );
  };

  return (
    <nav className="mobile-nav" ref={navRef}>
      <NavLink to="/" className="mobile-logo" onClick={closeMenu}>
        <img src={logo} alt="GFStore" />
      </NavLink>
      <UserMenu></UserMenu>
      <div className="mobile-actions">
        <button
          type="button"
          className="cart-btn"
          onClick={toggleCart}
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
          <span className={`cart-badge ${cart.length ? "visible" : ""}`}>
            {cart.length}
          </span>
        </button>

        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {categories.map((category) => (
              <li className="mobile-menu-item" key={category.name}>
                <button
                  type="button"
                  className="mobile-category-btn"
                  onClick={() => toggleCategory(category.name)}
                  aria-expanded={openCategory === category.name}
                >
                  {category.name}
                </button>

                {openCategory === category.name && (
                  <div className="mobile-submenu">
                    <NavLink
                      className="view-all-link"
                      to={category.path}
                      onClick={closeMenu}
                    >
                      Ver todo {category.name}
                    </NavLink>

                    {category.columns.map((column) => (
                      <div className="mobile-column" key={column.title}>
                        <h3>{column.title}</h3>

                        {column.links.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={closeMenu}
                          >
                            {link.name}
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
