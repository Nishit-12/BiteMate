import React from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length == 0) {
    return (
      <div className="rescart">
        <div className="m-5 w-100 text-center fs-3">The Cart Is Empty!</div>
      </div>
    );
  }

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:8000/api/myorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        orderData: data,
        orderDate: new Date().toDateString(),
      }),
    });

    let jsonRes = await response.json();

    if (jsonRes.success) {
      dispatch({ type: "DROP" });
      toast.success("Order Has Been Placed");
    }
  };

  let finalTotalprice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div
        className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md"
        style={{ height: "500px", overflowY: "scroll" }}
      >
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Trash2
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {finalTotalprice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-3 " onClick={handleCheckout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
