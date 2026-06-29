import { useEffect, useState } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import "./Admin.css";

function Admin() {
  const isAdmin = localStorage.getItem("isAdmin");

     if (!isAdmin) {
     return <Navigate to="/admin-login" />;
   }
   
   const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
    };

  const [orders, setOrders] = useState([]);

   const [quotePrice, setQuotePrice] =
  useState({});

const [depositAmount,
  setDepositAmount] =
  useState({});

  useEffect(() => {
    fetch("http://localhost:5000/custom-orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
const pendingOrders =
  orders.filter(
    (order) =>
      order.status === "Pending"
  );

const inProgressOrders =
  orders.filter(
    (order) =>
      order.status === "InProgress"
  );

const completedOrders =
  orders.filter(
    (order) =>
      order.status === "Completed"
  );

  const updateStatus = async (
  id,
  status
 ) => {
  try {
    await fetch(
      `http://localhost:5000/custom-orders/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          status
        })
      }
    );

    setOrders(
      orders.map((order) =>
        order._id === id
          ? {
              ...order,
              status
            }
          : order
      )
    );

  } catch (error) {
    console.log(error);
  }
 };

   const handleSendQuote =
  async (id) => {
    try {
      await fetch(
        `http://localhost:5000/custom-orders/${id}/quote`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json"
          },
          body:
            JSON.stringify({
              quotedPrice:
                Number(
                  quotePrice[id]
                ),
              depositRequired:
                Number(
                  depositAmount[id]
                )
            })
        }
      );

      const response =
        await fetch(
          "http://localhost:5000/custom-orders"
        );

      const data =
        await response.json();

      setOrders(data);

    } catch (error) {
      console.log(error);
    }
  };

   const completeOrder = async (order) => {
  const remaining =
    order.quotedPrice -
    order.depositRequired;

  const confirmComplete =
    window.confirm(
      `This order is finished.\n\nRemaining Balance: KSh ${remaining}\n\nSend payment reminder and mark as completed?`
    );

  if (!confirmComplete) return;

  updateStatus(
    order._id,
    "Completed"
  );
}; 
  return (
    <div className="admin-page">
      <h1>Yarnique Orders 🧶💖</h1>

      <div className="admin-tabs">

        <button
          className="active-tab"
        >
         📦 Custom Orders
       </button>

       <button
         onClick={() =>
           navigate("/admin/products")
          }
         >
          🧶 Products
       </button>

       </div>

      <div className="orders-container">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>

            {order.image && (
             <img
                src={`http://localhost:5000/uploads/${order.image}`}
                alt="Inspiration"
                className="order-image"
              />
             )}
             
          <h3>{order.fullName}</h3>

            <p>
              <strong>Email:</strong> {order.email}
            </p>

            <p>
              <strong>Item:</strong> {order.itemType}
            </p>
            
            {order.size && (
             <p>
               <strong>Size:</strong> {order.size}
             </p>
            )}

            {order.bust && (
              <p>
                <strong>Bust:</strong> {order.bust} in
              </p>
            )}

            {order.waist && (
              <p>
                <strong>Waist:</strong> {order.waist} in
              </p>
            )}

            {order.hips && (
             <p>
               <strong>Hips:</strong> {order.hips} in
             </p>
            )}

            {order.topLength && (
             <p>
               <strong>Top Length:</strong>
               {" "}
               {order.topLength}
               {order.topLength === "Custom Length" &&
               order.topLengthInches &&
               ` (${order.topLengthInches} in)`}
             </p>
            )}

            {order.bottomLength && (
              <p>
                <strong>Bottom Length:</strong>
                {" "}
                {order.bottomLength}
                {order.bottomLength === "Custom Length" &&
                order.bottomLengthInches &&
                ` (${order.bottomLengthInches} in)`}
              </p>
             )}
            <p>
              <strong>Colors:</strong> {order.colors}
            </p>

            <p>
              <strong>Description:</strong>
              <br />
              {order.description}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              {order.status}
             </p>

             {order.quotedPrice > 0 && (
  <p>
    <strong>
      Total Price:
    </strong>{" "}
    KSh {order.quotedPrice}
  </p>
)}

{order.depositRequired >
  0 && (
  <p>
    <strong>
      Deposit:
    </strong>{" "}
    KSh {
      order.depositRequired
    }
  </p>
)}

           <div
               className={`status ${order.status}`}
            >
              {order.status}
           </div>
            
         <div className="status-buttons">

          {order.status ===
    "Pending" && (
    <>
      <input
        type="number"
        placeholder="Total Price"
        value={
          quotePrice[
            order._id
          ] || ""
        }
        onChange={(e) =>
          setQuotePrice({
            ...quotePrice,
            [order._id]:
              e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Deposit Required"
        value={
          depositAmount[
            order._id
          ] || ""
        }
        onChange={(e) =>
          setDepositAmount({
            ...depositAmount,
            [order._id]:
              e.target.value
          })
        }
      />

      <button
        onClick={() =>
          handleSendQuote(
            order._id
          )
        }
      >
        💰 Send Quote
      </button>
    </>
  )}

{order.status ===
  "Quote Sent" && (
  <button
    onClick={() =>
      updateStatus(
        order._id,
        "InProgress"
      )
    }
  >
    💳 Payment Received - Start Order
  </button>
)}

  {order.status ===
    "InProgress" && (
    <button
      onClick={() =>
        updateStatus(
          order._id,
          "Completed"
        )
      }
    >
      🟢 Mark Completed
    </button>
  )}


        </div>
        </div>
        ))}
      </div>
          <footer className="admin-footer">
           <button
           className="logout-btn"
           onClick={handleLogout}
           >
           Logout
           </button>

           <p>© 2025 Yarnique 🧶💖</p>
        </footer>
    </div>
  );
}

export default Admin;