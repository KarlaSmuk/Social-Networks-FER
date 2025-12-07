import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
