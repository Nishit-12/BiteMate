import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const data = useCart();
  const dispatch = useDispatchCart();

  const foodData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const finalResponse = await response.json();

    setFoodCat(finalResponse[1]);
    setFoodItems(finalResponse[0]);

    // console.log(finalResponse);
  };

  useEffect(() => {
    foodData();
  }, []);

  return (
    <>
      <div className="res">
        <div>
          <Header />
        </div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" id="carousel">
              <div className=" carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center ">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900x400/?burger"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x400/?pastry"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x400/?pizza"
                  className="d-block w-100"
                  alt="..."
                  style={{ filter: "brightness(30%)" }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className=" container">
          {foodCat.length > 0 ? (
            foodCat.map((data, index) => {
              return (
                <div className="row mb-3 ">
                  <div key={data._id | index} className=" fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItems.length > 0 ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((finalData) => {
                        return (
                          <>
                            <div
                              key={finalData._id}
                              className=" col-12 col-md-6 col-lg-3 rescards"
                            >
                              <Cards
                                foodItems={finalData}
                                options={finalData.options[0]}
                              />
                            </div>
                          </>
                        );
                      })
                  ) : (
                    <div>Currently Not Available</div>
                  )}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
