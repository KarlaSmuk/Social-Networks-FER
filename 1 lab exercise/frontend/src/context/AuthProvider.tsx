import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { UserData, AuthState } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for initialization
  const signRef = useRef(false);
  const navigate = useNavigate();
  
  // Initialize auth state from localStorage on app start
  useEffect(() => {
    if (!signRef.current) initializeAuth();
  }, []);

  // Function to verify token with backend
  const verifyTokenWithBackend = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  const initializeAuth = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user_data");
      const storedToken = localStorage.getItem("auth_token");

      if (storedUser && storedToken) {
        const isValidToken = await verifyTokenWithBackend(storedToken);

        if (isValidToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          navigate("/");
        } else {
          console.log("Stored token is invalid/expired, clearing storage");
          localStorage.removeItem("user_data");
          localStorage.removeItem("auth_token");
        }
      }
    } catch {
      localStorage.removeItem("user_data");
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useCallback((userData: UserData, authToken: string) => {
    signRef.current = true;
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user_data", JSON.stringify(userData));
    localStorage.setItem("auth_token", authToken);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    signRef.current = false;
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_token");
  }, []);

  const value: AuthState = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
