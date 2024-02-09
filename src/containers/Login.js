import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async (formData) => {
    const { email, password } = formData;
    try {
      const response = await fetch(
        "https://user-portal-backend.vercel.app/api/v1/user/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      localStorage.setItem("jwtToken", data.token);

      if (data.success) {
        navigate("/details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    }
    if (!formData.password.trim()) {
      errors.password = "Please enter your password";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Login</h2>
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
            className="w-80 rounded border px-3 py-2"
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded px-4 py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
