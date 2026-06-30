import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ViewCart.css";

function ViewCart() {
  const navigate =
    useNavigate();

  const [cart, setCart] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || []
    );

  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

  const handleRemove =
    (index) => {
      const updatedCart =
        cart.filter(
          (_, i) =>
            i !== index
        );

      setCart(
        updatedCart
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(
          updatedCart
        )
      );
    };

  return (
    <div className="cart-page">
      <h1>
        My Cart 🛒
      </h1>

      {cart.length ===
      0 ? (
        <p>
          Your cart is empty.
        </p>
      ) : (
        <>
          {cart.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="cart-card"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                  alt={
                    item.name
                  }
                />

                <div>
                  <h3>
                    {
                      item.name
                    }
                  </h3>

                  <p>
                    Color:
                    {" "}
                    {
                      item.color
                    }
                  </p>

                  <p>
                    Size:
                    {" "}
                    {
                      item.size
                    }
                  </p>

                  <p>
                    KSh
                    {" "}
                    {
                      item.price
                    }
                  </p>

                  <button
                    onClick={() =>
                      handleRemove(
                        index
                      )
                    }
                  >
                    Remove
                  </button>
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

          <button
            onClick={() =>
              navigate(
                "/payment"
              )
            }
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

export default ViewCart;