import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProfileDetails() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem("jwtToken");

  const { email, name, id } = jwtDecode(token);

  const handleAddDetails = () => {
    navigate("/profile-update");
  };

  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://user-portal-backend.vercel.app/api/v1/profile/details/?searchKey=${id}`,
        {
          method: "GET",

          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      setUserData(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg bg-white p-12 rounded shadow-md ">
        <h2 className="text-2xl font-semibold mb-4">User Profile Details</h2>
        <div className="flex ">
          <div className="m-2 w-80">
            <label className="text-gray-600">Name:</label>
            <p className="text-lg font-semibold">{name}</p>
          </div>
          <div className="m-2 w-80">
            <label className="text-gray-600">Email:</label>
            <p className="text-lg font-semibold">{email}</p>
          </div>
        </div>
        {userData ? (
          <>
            <div className="flex ">
              <div className="m-2 w-80">
                <label className="text-gray-600">Age:</label>
                <p className="text-lg font-semibold">{userData.age}</p>
              </div>
              <div className="m-2 w-80">
                <label className="text-gray-600">Gender:</label>
                <p className="text-lg font-semibold">{userData.gender}</p>
              </div>
            </div>
            <div className="flex ">
              <div className="m-2 w-80">
                <label className="text-gray-600">Date Of Birth:</label>
                <p className="text-lg font-semibold">{userData.dob}</p>
              </div>
              <div className="m-2 w-80">
                <label className="text-gray-600">Mobile No:</label>
                <p className="text-lg font-semibold">{userData.mobile}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center m-2">
            <button
              onClick={handleAddDetails}
              className="bg-blue-500 text-white rounded px-16 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Add Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
