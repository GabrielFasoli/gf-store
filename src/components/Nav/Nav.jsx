import { DesktopNav } from "./DesktopNav.jsx";
import { MobileNav } from "./MobileNav.jsx";
import "./Nav.css";

export const Nav = ({ carrito, toggleCarrito }) => {
  return (
    <>
      <DesktopNav carrito={carrito} toggleCarrito={toggleCarrito} />
      <MobileNav carrito={carrito} toggleCarrito={toggleCarrito} />
    </>
  );
};
