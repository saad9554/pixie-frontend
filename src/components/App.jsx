import React, { useEffect, useState } from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import PaymentHistory from "./PaymentHistory";
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";
import AdminLogout from "./AdminLogout";
import AdminProduct from "./AdminProduct";
import AdminEditProduct from "./AdminEditProduct";
import AdminAddProduct from "./AdminAddProduct";
import AdminAccount from "./AdminAccount";

export default function App() {
  let pathname = window.location.pathname;
  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);
  let [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              isActive={`${pathname.match("/") ? "active" : ""}`}
            />
          }
        />
        <Route
          path="register"
          element={
            <Register
              isActive={`${pathname.match("/register") ? "active" : ""}`}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login isActive={`${pathname.match("/login") ? "active" : ""}`} />
          }
        />
        <Route path="logout" element={<Logout />} />
        <Route
          path="payment-history"
          element={
            <PaymentHistory
              isActive={`${pathname.match("/payment-history") ? "active" : ""}`}
            />
          }
        />
        <Route path="admin" element={<AdminLogin />} />
        <Route
          path="admin_home"
          element={
            <AdminHome
              isActive={`${pathname.match("/admin_home") ? "active" : ""}`}
            />
          }
        />
        <Route path="admin_logout" element={<AdminLogout />} />
        <Route
          path="admin_all_products"
          element={
            <AdminProduct
              isActive={`${
                pathname.match("/admin_all_products") ? "active" : ""
              }`}
            />
          }
        />
        <Route path="admin_edit_product/:id" element={<AdminEditProduct />} />
        <Route
          path="admin_add_product"
          element={
            <AdminAddProduct
              isActive={`${
                pathname.match("/admin_add_product") ? "active" : ""
              }`}
            />
          }
        />
        <Route
          path="admin_accounts"
          element={
            <AdminAccount
              isActive={`${pathname.match("/admin_accounts") ? "active" : ""}`}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
