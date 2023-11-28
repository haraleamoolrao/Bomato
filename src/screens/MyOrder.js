
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    console.log("hello");
    try {
      const response = await fetch("http://localhost:5000/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Sort orders by Order_date in descending order
        const sortedOrders = data.orderData.order_data
          ? data.orderData.order_data.slice(0).sort((a, b) => {
              const dateA = new Date(a[0].Order_date);
              const dateB = new Date(b[0].Order_date);
              return dateB - dateA;
            })
          : [];

        setOrderData({ order_data: sortedOrders });
      } else {
        console.error("Failed to fetch my order data");
      }
    } catch (error) {
      console.error("Error fetching my order data:", error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        {orderData && orderData.order_data
          ? orderData.order_data.map((orderGroup, groupIndex) => (
              <div key={groupIndex} className="row mt-3">
                {orderGroup.map((arrayData) => (
                  <div
                    key={arrayData._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <div className="card mt-1 ">
                      {/* <img
                        src={arrayData.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "120px", objectFit: "fill" }}
                      /> */}
                      <div className="card-body ">
                        <h5 className="card-title">{arrayData.name}</h5>
                        <div className="container w-100 p-0">
                          <div className="row">
                            <div className="col-6">
                              <span className="m-1">Quantity: {arrayData.qty}</span>
                              <span className="m-1">Size: {arrayData.size}</span>
                              <span className="m-1">Date: {arrayData.Order_date}</span>
                            </div>
                            <div className="col-6 text-end">
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          : ""}
      </div>
      <Footer />
    </>
  );
}
