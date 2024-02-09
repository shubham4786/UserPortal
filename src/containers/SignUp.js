import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const AddData = async (formData) => {
    const { name, email, password, confirmPassword } = formData;
    try {
      const response = await fetch(
        "https://user-portal-backend.vercel.app/api/v1/user/register",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
            token: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data);
      alert(data.message);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("SignUp", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log("Form submitted:", formData);
      AddData(formData);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md ">
        <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-80 rounded border px-3 py-2"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded px-4 py-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
