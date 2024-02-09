import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import ProfileUpdate from "./containers/ProfileUpdate";
import ProfileDetails from "./containers/ProfileDetails";
import NavBar from "./containers/NavBar";
import Layout from "./containers/Layout";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/details"
          element={
            <Layout>
              <ProfileDetails />
            </Layout>
          }
        />
        <Route
          path="/profile-update"
          element={
            <Layout>
              <ProfileUpdate />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
