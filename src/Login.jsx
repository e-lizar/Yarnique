import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [showPassword,
    setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body:
                JSON.stringify(
                  formData
                )
            }
          );

        const data =
          await response.json();

        if (!data.success) {
          alert(data.message);
          return;
        }

        localStorage.setItem(
          "customer",
          JSON.stringify(
            data.customer
          )
        );

        alert(data.message);

        navigate("/account");

      } catch (error) {
        console.log(error);
        alert(
          "Something went wrong."
        );
      }
    };

  return (
    <div className="login-page">
      <h1>
        Login 🧶💖
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          required
        />

        <div className="password-container">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "🙈"
              : "👁️"}
          </button>
        </div>

        <button
          type="submit"
        >
          Login
        </button>

        <p className="register-link">
  Don't have an account?{" "}
  <Link to="/register">
    Create Account
  </Link>
</p>
      </form>

      <footer className="about-footer">
       <Link to="/" className="back-home">
        Home
      </Link>

      <p>© 2025 Yarnique 🧶💖</p>
      </footer>

    </div>
  );
}

export default Login;