// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://user-portal-backend.vercel.app/api/v1/user/logout",
        {
          method: "POST",
          mode: "cors",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      alert(data.messege);
      if (data.success) {
        localStorage.removeItem("jwtToken");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          User Portal
        </Link>
        <div>
          <ul className="flex space-x-4">
            {token ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link to="/signup" className="text-white hover:text-gray-300">
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
