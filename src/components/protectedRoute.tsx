import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import type { JSX } from "react";

export const ProtectedRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "admin" | "user";
}) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};