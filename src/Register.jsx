import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const [showPassword, setShowPassword] =
  useState(false);

  const [showConfirmPassword,
  setShowConfirmPassword] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    try {
  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          fullName:
            formData.fullName,
          email:
            formData.email,
          password:
            formData.password
        })
      }
    );

  const data =
    await response.json();

  alert(data.message);

} catch (error) {
  console.log(error);

  alert(
    "Something went wrong."
  );
}
  };

  return (
    <div className="register-page">
      <h1>
        Create Account 🧶💖
      </h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={
            formData.fullName
          }
          onChange={
            handleChange
          }
          required
        />

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
             value={formData.password}
             onChange={handleChange}
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
        
        <div className="password-container">
           <input
    type={
      showConfirmPassword
        ? "text"
        : "password"
    }
    name="confirmPassword"
    placeholder="Confirm Password"
    value={
      formData.confirmPassword
    }
    onChange={handleChange}
    required
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword
      )
    }
  >
    {showConfirmPassword
      ? "🙈"
      : "👁️"}
  </button> 
        </div>

        
        <button
          type="submit"
        >
          Create Account
        </button>

        <p className="login-link">
  Already have an account?{" "}
  <Link to="/login">
    Login
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

export default Register;