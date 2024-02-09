import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ProfileUpdate() {
  const [userData, setUserData] = useState({
    age: "",
    gender: "",
    dob: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("jwtToken");
  const { id } = jwtDecode(token);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const upadteData = async (userData) => {
    const { age, gender, dob, mobile } = userData;
    try {
      const response = await fetch(
        "https://user-portal-backend.vercel.app/api/v1/profile/update",
        {
          method: "POST",
          body: JSON.stringify({
            age,
            gender,
            dob,
            mobile,
            userId: id,
          }),
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data);

      alert(data.message);
      if (data) {
        navigate("/details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!userData.age.trim()) {
      errors.age = "Please enter your age";
    } else if (isNaN(userData.age)) {
      errors.age = "Age must be a number";
    } else if (parseInt(userData.age) <= 0) {
      errors.age = "Age must be a positive number";
    }
    if (!userData.gender.trim()) {
      errors.gender = "Please enter your gender";
    }
    if (!userData.dob.trim()) {
      errors.dob = "Please enter your date of birth";
    }
    if (!userData.mobile.trim()) {
      errors.mobile = "Please enter your mobile number";
    } else if (!/^\d{10}$/.test(userData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // console.log("Updated data:", userData);
      upadteData(userData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="age" className="block mb-2">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className={`w-80 rounded border px-3 py-2 ${
                errors.age ? "border-red-500" : ""
              }`}
            />
            {errors.age && <div className="text-red-500">{errors.age}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 ${
                errors.gender ? "border-red-500" : ""
              }`}
            />
            {errors.gender && (
              <div className="text-red-500">{errors.gender}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 ${
                errors.dob ? "border-red-500" : ""
              }`}
            />
            {errors.dob && <div className="text-red-500">{errors.dob}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block mb-2">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
              className={`w-full rounded border px-3 py-2 ${
                errors.mobile ? "border-red-500" : ""
              }`}
            />
            {errors.mobile && (
              <div className="text-red-500">{errors.mobile}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded px-4 py-2"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
