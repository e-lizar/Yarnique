import {
  PayPalScriptProvider,
  PayPalButtons
} from "@paypal/react-paypal-js";

import { useNavigate } from "react-router-dom";

function PayPalCheckout({
    total,
    cart,
    customer,
    phone
}) {

    const navigate = useNavigate();

  return (

    <PayPalScriptProvider
      options={{
        "client-id":
          import.meta.env.VITE_PAYPAL_CLIENT_ID
      }}
    >

      <PayPalButtons

        createOrder={async () => {

          const response =
            await fetch(
              `${import.meta.env.VITE_API_URL}/payment/create-order`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  total
                })

              }
            );

          const order =
            await response.json();

          return order.id;

        }}

        onApprove={ async (data) => {
            try {
                const response = await fetch("http://localhost:5000/payment/capture-order",
                    { method: "POST", headers:{ "Content-Type": "application/json"},
                body:JSON.stringify({orderID: data.orderID})
            }
                );
                await response.json();
                const saveResponse = await fetch(`${import.meta.env.VITE_API_URL}/orders`,
                  {method:"POST", headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                  customerId: customer.id,
                  customerName: customer.fullName,
                  email: customer.email,
                  phone:"",
                  items: cart,
                  total,
                  paymentStatus:"Paid",
                  status:"Confirmed"
                })
              }
                );
                const order=
                      await saveResponse.json();
                    if(!order.success){
                      alert("Order failedto save.");
                      return;
                    }
                    localStorage.removeItem("cart");
                    alert("Payment Successful 🧶💖");
                    navigate("/my-orders");
            }
            catch(error){
                       console.log(error);
                       alert("Payment Failed");
            }
        }}

      />

    </PayPalScriptProvider>

  );

}

export default PayPalCheckout;