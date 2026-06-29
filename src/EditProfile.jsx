import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const [formData, setFormData] =
    useState({
      fullName:
        customer?.fullName || "",
      email:
        customer?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

  if (!customer) {
    return (
      <Navigate to="/login" />
    );
  }

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

      console.log(
       `http://localhost:5000/customers/${customer.id}`
      );

      try {
        const response =
          await fetch(
            `http://localhost:5000/customers/${customer.id}`,
            {
              method: "PATCH",
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
            {
              id:
                data.customer._id,
              fullName:
                data.customer.fullName,
              email:
                data.customer.email
            }
          )
        );

        alert(
          "Profile updated 🧶💖"
        );

        navigate("/account");

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="edit-page">
      <h1>
        Edit Profile 🧶💖
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
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

        <h3>Change Password 🔒</h3>

<input
  type="password"
  name="currentPassword"
  placeholder="Current Password"
  value={formData.currentPassword}
  onChange={handleChange}
/>

<input
  type="password"
  name="newPassword"
  placeholder="New Password"
  value={formData.newPassword}
  onChange={handleChange}
/>

<input
  type="password"
  name="confirmPassword"
  placeholder="Confirm New Password"
  value={formData.confirmPassword}
  onChange={handleChange}
/>

        <button
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;