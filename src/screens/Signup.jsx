import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.username,
        email: data.email,
        password: data.password,
        location: data.location,
      }),
    });

    const json = await response.json();

    console.log(json);

    if (!json.success) {
      toast.error("Enter Valid Credentials!");
    } else {
      setData({ username: "", email: "", password: "", location: "" });
      toast.success("SignUp Success");
      navigate("/login");
    }
  };

  const handleLocation = async (e) => {
    e.preventDefault();

    let location = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    let latlong = await location().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;

      return [latitude, longitude];
    });

    let [lat, long] = latlong;

    const response = await fetch("http://localhost:8000/api/getlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: long,
      }),
    });

    let jsonRes = await response.json();
    const finalLocation = jsonRes.location;
    console.log(finalLocation);
    setData({ ...data, location: finalLocation });
    setAddress(finalLocation);
  };

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className=" container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            autoComplete="off"
            name="username"
            value={data.username}
            onChange={handleData}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mt-3 mb-4">
          <button
            type="button"
            onClick={handleLocation}
            className=" btn btn-success"
          >
            Get Current Location
          </button>
        </div>
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

        <div className="ressign">
          <button type="submit" className="btn btn-success m-auto">
            SignUp
          </button>
          <Link to={"/login"} className=" ms-3 m-auto btn btn-danger">
            Already Registered?
          </Link>
          <Link to={"/"} className=" ms-3 m-auto btn btn-info">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
