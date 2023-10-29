import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {
  const reference = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);

  let authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  let dispatch = useDispatchCart();
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let finalPrice = qty * parseInt(options[size]);

  const handleAddtocart = async () => {
    let food = [];

    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
      }
    }

    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });

        toast.success("Cart Updated");

        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          size: size,
          qty: qty,
        });

        toast.success("Added To Cart");

        return;
      }
      return;
    }

    if (!authToken) {
      navigate("/login");
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItems._id,
        name: props.foodItems.name,
        price: finalPrice,
        size: size,
        qty: qty,
      });

      toast.success("Added To Cart");
    }

  };

  useEffect(() => {
    setSize(reference.current.value);
  }, []);

  return (
    <>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "160px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <div className="container w-100 d-flex flex-row">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={reference}
            >
              {priceOptions.map((data) => {
                return (
                  <>
                    <option value={data} key={data}>
                      {data}
                    </option>
                  </>
                );
              })}
            </select>

            <div className=" d-inline h-100 fs-6 mt-2">₹{finalPrice}/-</div>
          </div>
          <div className="container w-100 mt-2">
            <hr />
            <button
              className=" btn btn-success justify-content-center ms-2"
              onClick={handleAddtocart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
