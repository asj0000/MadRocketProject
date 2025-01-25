import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext"; // Custom hook to use the auth state

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
