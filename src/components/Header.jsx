import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Header = () => {
  const [cartView, setCartView] = useState(false);

  const data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartItems");
    navigate("/login");
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to={"/"}>
            BiteMate
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" to={"/"}>
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to={"/myorders"}>
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {localStorage.getItem("authToken") ? (
              <>
                <div className="reshead">
                  <div style={{ position: "relative" }}>
                    <div
                      className="btn bg-white text-success mx-2 mt-0"
                      onClick={() => {
                        setCartView(true);
                      }}
                    >
                      My Cart
                    </div>

                    {data.length > 0 ? (
                      <div
                        style={{
                          position: "absolute",
                          height: "2px",
                          width: "2px",
                          border: "12px solid red",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "15px",
                          transform: "translate(82px, -48px)",
                        }}
                      >
                        {data.length}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : (
                    ""
                  )}

                  <div
                    className="btn bg-white text-danger mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </>
            ) : (
              <div className=" d-flex ">
                <Link className="btn bg-white text-success mx-1" to={"/login"}>
                  Login
                </Link>

                <Link className="btn bg-white text-success mx-1" to={"/signup"}>
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
