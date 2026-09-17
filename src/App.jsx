import "./index.css";
import { Home } from "./pages/home/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav/Nav.jsx";
import { useCard } from "./hooks/useCard.js";
import { CartPanel } from "./components/CartPanel.jsx";
import { useProducts } from "./hooks/useProducts.js";
import { Outlet } from "./pages/outlet/Outlet.jsx";
import { Sports } from "./pages/sports/Sports.jsx";
import { Women } from "./pages/women/Women.jsx";
import { Men } from "./pages/men/Men.jsx";
import { Kids } from "./pages/kids/Kids.jsx";
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
  const hideNav = location.pathname === "/order-confirmation";
  const { products } = useProducts();
  const {
    cart,
    cartOpen,
    addProduct,
    increaseProduct,
    decreaseProduct,
    calculateTotal,
    toggleCart,
    removeProduct,
    clearCart,
  } = useCard();

  return (
    <>
      {!hideNav && <AnnouncementBar />}
      {!hideNav && <Nav cart={cart} toggleCart={toggleCart} />}
      <Routes>
        <Route
          path="/"
          element={
            <Home products={products} addProduct={addProduct} />
          }
        />
        <Route
          path="/mujer/:subcategoria?"
          element={<Women products={products} />}
        />
        <Route
          path="/hombre/:subcategoria?"
          element={<Men products={products} />}
        />
        <Route
          path="/ninos/:subcategoria?"
          element={<Kids products={products} />}
        />
        <Route
          path="/deportes/:subcategoria?"
          element={<Sports products={products} />}
        />
        <Route
          path="/outlet/:subcategoria?"
          element={<Outlet products={products} />}
        />
        <Route
          path="/productsdetails/:id"
          element={
            <ProductsDetails
              addToCart={addProduct}
              products={products}
            />
          }
        />
        <Route
          path="/lookbook/:tag"
          element={<Lookbook products={products} />}
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
              cart={cart}
              increaseProduct={increaseProduct}
              decreaseProduct={decreaseProduct}
              removeProduct={removeProduct}
              calculateTotal={calculateTotal}
              products={products}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmation
              cart={cart}
              calculateTotal={calculateTotal}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      {!hideNav && (
        <CartPanel
          cart={cart}
          increaseProduct={increaseProduct}
          decreaseProduct={decreaseProduct}
          removeProduct={removeProduct}
          cartOpen={cartOpen}
          toggleCart={toggleCart}
          calculateTotal={calculateTotal}
        />
      )}
    </>
  );
}

export default App;
