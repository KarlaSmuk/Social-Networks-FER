import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function LoginCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get("token");
        const errorParam = searchParams.get("error");

        // Handle OAuth error
        if (errorParam) {
          console.error("OAuth error:", errorParam);
          setError("Login was cancelled or failed. Please try again.");
          return;
        }

        // Handle missing token
        if (!token) {
          setError("No authentication token received. Please try again.");
          return;
        }

        try {
          const payload = JSON.parse(atob(token.split(".")[1]));

          const userData = {
            id: payload.sub,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            picture: payload.picture,
          };

          signIn(userData, token);

          // Redirect to dashboard
          navigate("/", { replace: true });
        } catch {
          setError("Invalid authentication token. Please try again.");
        }
      } catch {
        setError("An unexpected error occurred");
      }
    };

    handleCallback();
  }, [searchParams, navigate, signIn]);

  if (error) {
    return (
      <div>
        <div>
          <h2>Sign In Failed</h2>
          <p>{error}</p>
          <div>
            <button onClick={() => navigate("/login")}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return;
}

export default LoginCallback;
