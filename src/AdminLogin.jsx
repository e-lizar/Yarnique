import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "isAdmin",
          "true"
        );

        navigate("/admin");
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.log(error);

      setMessage(
        "Server error. Try again."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>
          Yarnique Admin 🧶💖
        </h1>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="error">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default AdminLogin;