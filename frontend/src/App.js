import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Product from "./pages/Product"
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import About from "./pages/About";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Temporary pages (you can replace later)
const NotFound = () => <h2 style={{ padding: "30px" }}>404 Page Not Found</h2>;

function App() {
  return (
    <>
    <StoreProvider>
      <div className="app-container">
      {/* Navbar appears on every page */}
      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Shop page */}
        <Route path="/shop" element={<Shop />} />

        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        
        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <ToastContainer
  position="bottom-right"
  autoClose={1500}
  hideProgressBar
/>
</div>
      </StoreProvider>
    </>
  );
}

export default App;