import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalCheckout from "./components/PayPalCheckout";
import "./Payment.css";


function Payment() {
  const navigate = useNavigate();

  const cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const [phone, setPhone] =
    useState("");
  
  const [paymentMethod, setPaymentMethod] =
  useState("mpesa");

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );

  const handlePayment =
  async () => {
    if (!phone) {
      alert(
        "Enter your M-Pesa phone number.."
      );
      return;
    }

    try {
      const stkResponse =
        await fetch(
          "http://localhost:5000/mpesa/stkpush",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(
                {
                  phone,
                  amount: total,
                  customerId: customer.id,
                  customerName: customer.fullName,
                  email: customer.email,
                  items: cart,
                  total
                }
              )
          }
        );

      const stkData =  await stkResponse.json();

      localStorage.removeItem("cart");

      console.log(stkData);

      alert("Payment Successful 🧶💖");
      
      navigate("/my-orders");
    } 
    catch (error){
      console.log(error);
      alert("Failed to send STK Push");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>
          Checkout 🧶💖
        </h1>

        <h2>
          Order Summary
        </h2>

        {cart.map(
          (item, index) => (
            <div
              key={index}
              className="payment-item"
            >
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />

              <div>
                <h3>
                  {item.name}
                </h3>

                <p>
                  Color:
                  {" "}
                  {item.color}
                </p>

                <p>
                  Size:
                  {" "}
                  {item.size}
                </p>

                <p>
                  KSh
                  {" "}
                  {item.price}
                </p>
              </div>
            </div>
          )
        )}

        <h2>
          Total:
          {" "}
          KSh
          {" "}
          {total}
        </h2>

        <h3>Select Payment Method</h3>
           <div className="payment-options">
               <label>
                      <input
                            type="radio"
                            value="mpesa"
                            checked={paymentMethod === "mpesa"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            M-Pesa
                 </label>
                 <label>
                        <input
                              type="radio"
                              value="paypal"
                              checked={paymentMethod === "paypal"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              />
                              PayPal
                 </label>
           </div>
           {paymentMethod === "mpesa" &&(
            <>
               <input
                     type="tel"
                     placeholder="Phone Number"
                     value={phone}
                     onChange={(e)=>setPhone(e.target.value)}
                />
                <button
                onClick={handlePayment}
                >
                  Pay with M-Pesa
                </button>
            </>
           )}
          {paymentMethod === "paypal" && (
             <PayPalCheckout 
                         total={total}
                         cart={cart}
                         customer={customer}
                         phone={phone}
             />
          )}

        <p className="delivery-note">
          After payment,
          Yarnique will
          personally contact
          you regarding
          delivery
          arrangements 🧶💖
        </p>
      </div>
    </div>
  );
}

export default Payment;