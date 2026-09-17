import "./index.css";
import { Home } from "./pages/home/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav/Nav.jsx";
import { useCard } from "./hooks/useCard.js";
import { CarritoPanel } from "./components/carritoPanel.jsx";
import { useProducts } from "./hooks/useProducts.js";
import { Outlet } from "./pages/outlet/Outlet.jsx";
import { Deportes } from "./pages/deportes/Deportes.jsx";
import { Mujer } from "./pages/mujer/Mujer.jsx";
import { Hombre } from "./pages/hombre/Hombre.jsx";
import { Niños } from "./pages/niños/Niños.jsx";
import { ProductsDetails } from "./pages/productsdetails/ProductsDetails.jsx";
import { Lookbook } from "./pages/looks/Lookbook.jsx";
import { CreateProduct } from "./pages/adminPanel/CreateProduct.jsx";
import { AllProducts } from "./pages/products/AllProducts.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { CheckoutPage } from "./pages/checkout/CheckoutPage.jsx";
import { OrderConfirmation } from "./pages/orderconfirmation/OrderConfirmation.jsx";
import { AnnouncementBar } from "./components/AnnouncementBar.jsx";

function App() {
  const location = useLocation();
  const ocultarNav = location.pathname === "/order-confirmation";
  const { products } = useProducts();
  const {
    carrito,
    carritoAbierto,
    agregarProductos,
    sumarProducts,
    restarProducts,
    calcularTotal,
    toggleCarrito,
    eliminarProducto,
    vaciarCarrito,
  } = useCard();

  return (
    <>
      {!ocultarNav && <AnnouncementBar />}
      {!ocultarNav && <Nav carrito={carrito} toggleCarrito={toggleCarrito} />}
      <Routes>
        <Route
          path="/"
          element={
            <Home products={products} agregarProductos={agregarProductos} />
          }
        />
        <Route
          path="/mujer/:subcategoria?"
          element={<Mujer productos={products} />}
        />
        <Route
          path="/hombre/:subcategoria?"
          element={<Hombre productos={products} />}
        />
        <Route
          path="/ninos/:subcategoria?"
          element={<Niños productos={products} />}
        />
        <Route
          path="/deportes/:subcategoria?"
          element={<Deportes productos={products} />}
        />
        <Route
          path="/outlet/:subcategoria?"
          element={<Outlet productos={products} />}
        />
        <Route
          path="/productsdetails/:id"
          element={
            <ProductsDetails
              agregarAlCarrito={agregarProductos}
              productos={products}
            />
          }
        />
        <Route
          path="/lookbook/:tag"
          element={<Lookbook productos={products} />}
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/products"
          element={<AllProducts products={products} />}
        ></Route>
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              carrito={carrito}
              sumarProducts={sumarProducts}
              restarProducts={restarProducts}
              eliminarProductos={eliminarProducto}
              calcularTotal={calcularTotal}
              productos={products}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmation
              carrito={carrito}
              calcularTotal={calcularTotal}
              vaciarCarrito={vaciarCarrito}
            />
          }
        />
      </Routes>

      {!ocultarNav && (
        <CarritoPanel
          carrito={carrito}
          sumarProducts={sumarProducts}
          restarProducts={restarProducts}
          eliminarProductos={eliminarProducto}
          carritoAbierto={carritoAbierto}
          toggleCarrito={toggleCarrito}
          calcularTotal={calcularTotal}
        />
      )}
    </>
  );
}

export default App;
