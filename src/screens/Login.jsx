import Cookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatchCart } from "../components/ContextReducer";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatchCart();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://bite-mate-backend.vercel.app/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const json = await response.json();

    console.log(json);

    if (!json.success) {
      // alert("Enter Valid Credentials!");
      toast.error("Enter Valid Credentials!");
      setData({ email: "", password: "" });
    } else {
      toast.success("Login Success");
      navigate("/");
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", data.email);
      dispatch({ type: "DROP" });
      console.log(localStorage.getItem("authToken"));
    }
  };

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className=" container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleData}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleData}
          />
        </div>
        <div className="reslogin">
          <button type="submit" className="btn btn-success m-auto" id="login">
            Login
          </button>
          <Link to={"/signup"} className=" ms-3 m-auto btn btn-danger resimp">
            Haven't Created A Account?
          </Link>
          <Link to={"/"} className=" ms-3 m-auto btn btn-info">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
