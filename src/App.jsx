import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Signup from "./screens/Signup";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./components/ContextReducer";
import Myorders from "./screens/Myorders";

const App = () => {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myorders" element={<Myorders />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </>
  );
};

export default App;
