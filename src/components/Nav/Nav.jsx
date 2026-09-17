import { DesktopNav } from "./DesktopNav.jsx";
import { MobileNav } from "./MobileNav.jsx";

export const Nav = ({ cart, toggleCart }) => {
  return (
    <>
      <DesktopNav cart={cart} toggleCart={toggleCart} />
      <MobileNav cart={cart} toggleCart={toggleCart} />
    </>
  );
};
