import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default AuthRoute;
