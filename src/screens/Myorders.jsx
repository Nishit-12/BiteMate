import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Myorders = () => {
  const [orderData, setorderData] = useState([]);

  const fetchMyorders = async () => {
    let response = await fetch("http://localhost:8000/api/myorderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });

    let jsonRes = await response.json();
    console.log([jsonRes])
    setorderData([jsonRes]);
  };

  useEffect(() => {
    fetchMyorders();
  }, []);

  return (
    <div className=" d-flex flex-column min-vh-100">
      <div>
        <Header />
      </div>

      <div className='container flex-grow-1'>
                <div className='row'>

                    {orderData.length > 0 ? orderData.map(data => {

                      let dateData;

                        return (
                            data.order_data ?
                                data.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {

                                          

                                            return (
                                                <div  >
                                                    {arrayData.orderDate ? <div className='m-auto mt-5'>

                                                        {dateData = arrayData.orderDate}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", height: "120px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.quantity}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{dateData}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : <div className="mt-5 d-flex fs-3 justify-content-center">You Haven't Order Something Yet.</div>}
                </div>


            </div>


      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Myorders;
