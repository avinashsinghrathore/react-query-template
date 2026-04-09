import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Articles from "./components/Articles/Articles";
import Admin from "./components/Admin/Admin";
import ContactUs from "./components/ContactUs/ContactUs";
import NotFound from "./components/NotFound/NotFound";
import SingleProduct from "./components/Products/SingleProduct";
import Sales from "./components/Admin/Sales";
import Sellers from "./components/Admin/Sellers";
import Users from "./components/Admin/Users";

const App = () => {
  return (
    <div className="app">
      <Navbar />

      <main className="app_main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="sales" element={<Sales />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
