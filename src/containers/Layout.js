import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    navigate("/");
  }

  return <>{props.children}</>;
};

export default Layout;
