import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  return localStorage.getItem("uid") ? <Outlet /> : <Navigate to={"/"} />;
  
};

export default PublicRoutes;
