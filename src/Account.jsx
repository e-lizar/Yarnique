import { Navigate, useNavigate } from "react-router-dom";
import "./Account.css";

function Account() {
  const navigate = useNavigate();

  const customer =
    JSON.parse(
      localStorage.getItem(
        "customer"
      )
    );

  if (!customer) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  const handleLogout = () => {
    localStorage.removeItem(
      "customer"
    );

    navigate("/login");
  };

  return (
    <div className="account-page">
      <h1>
        My Account 🧶💖
      </h1>

      <div className="account-card">
        <h2>
          {customer.fullName}
        </h2>

        <p>
          {customer.email}
        </p>

        <div className="account-buttons">
          <button
            onClick={() =>
            navigate(
             "/my-orders"
            )
           }
          >
            My Orders
          </button>

          <button
             onClick={() =>
                   navigate("/cart")
                        }
                     >
                 View Cart
              </button>

          <button
            onClick={() =>
             navigate(
            "/edit-profile"
          )
          }
           >
            Edit Profile
          </button>

          <button
            onClick={
              handleLogout
            }
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;