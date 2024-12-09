import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useCart } from "./context/CartContext";

// PrivateRoute Component
const PrivateRoute = ({ condition, redirectTo, children }) => {
  return condition ? children : <Navigate to={redirectTo} />;
};

function App() {
  const { cart } = useCart(); // Access cart context

  return (
    <Router>
      <Navbar />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Protect the Checkout route */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute condition={cart.length > 0} redirectTo="/cart">
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
