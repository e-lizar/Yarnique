import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const [orders, setOrders] =
    useState([]);

  const [customOrders, setCustomOrders] =
    useState([]);

  useEffect(() => {
    if (!customer) return;

    // Fetch purchased orders
    fetch(
      `http://localhost:5000/orders/customer/${customer.id}`
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch custom requests
    fetch(
      `http://localhost:5000/custom-orders/customer/${customer.email}`
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setCustomOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  if (!customer) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <div className="my-orders-page">
      <h1>
        My Orders 🧶💖
      </h1>

      <h2>
        Purchased Orders 🛍️
      </h2>

      {orders.length === 0 ? (
        <p>
          No purchased orders yet.
        </p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order._id}
            >
              {order.items.map(
                (item, index) => (
                  <div key={index}>
                    {item.image && (
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        className="order-image"
                      />
                    )}

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      <strong>
                        Color:
                      </strong>{" "}
                      {item.color}
                    </p>

                    <p>
                      <strong>
                        Size:
                      </strong>{" "}
                      {item.size}
                    </p>

                    <p>
                      <strong>
                        Price:
                      </strong>{" "}
                      KSh {item.price}
                    </p>
                  </div>
                )
              )}

              <hr />

              <p>
                <strong>
                  Total:
                </strong>{" "}
                KSh {order.total}
              </p>

              <p>
                <strong>
                  Payment:
                </strong>{" "}
                {order.paymentStatus} ✅
              </p>

              <p>
                <strong>
                  Delivery:
                </strong>{" "}
                {order.deliveryStatus}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {order.status}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2>
        Custom Requests 🧶
      </h2>

      {customOrders.length === 0 ? (
        <p>
          No custom requests yet.
        </p>
      ) : (
        <div className="orders-container">
          {customOrders.map(
            (order) => (
              <div
                className="order-card"
                key={order._id}
              >
                {order.image && (
                  <img
                    src={`http://localhost:5000/uploads/${order.image}`}
                    alt="Custom Order"
                    className="order-image"
                  />
                )}

                <h3>
                  {order.itemType}
                </h3>

                <p>
                  <strong>
                    Colors:
                  </strong>{" "}
                  {order.colors}
                </p>

                <p>
                  <strong>
                    Description:
                  </strong>
                  <br />
                  {order.description}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {order.status}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyOrders;