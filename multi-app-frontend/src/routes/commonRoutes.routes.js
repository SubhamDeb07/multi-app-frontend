import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/Login.js";
import Signup from "../pages/Signup.js";
import AppsHome from "../pages/AppsHome.js";
import ForgotPassword from "../pages/ForgotPassword.js";

const commonRoutes = (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/apps" element={<AppsHome />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </>
);

export default commonRoutes;
