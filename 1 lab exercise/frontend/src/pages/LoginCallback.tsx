import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function LoginCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract token from query parameters
        const token = searchParams.get("token");
        const errorParam = searchParams.get("error");

        // Handle OAuth error
        if (errorParam) {
          console.error("OAuth error:", errorParam);
          setError("Login was cancelled or failed. Please try again.");
          setLoading(false);
          return;
        }

        // Handle missing token
        if (!token) {
          setError("No authentication token received. Please try again.");
          setLoading(false);
          return;
        }

        // Decode the token to get user info
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));

          const userData = {
            id: payload.sub,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            picture: payload.picture,
          };
          // Use auth context to sign in user
          signIn(userData, token);

          // Redirect to dashboard
          navigate("/", { replace: true });
        } catch {
          setError("Invalid authentication token. Please try again.");
        }
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate, signIn]);

  if (loading) {
    return (
      <div className="login-callback-container">
        <div className="callback-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <h2>🔐 Completing Sign In...</h2>
          <p>Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <div>❌</div>
          <h2>Sign In Failed</h2>
          <p>{error}</p>
          <div>
            <button onClick={() => navigate("/login")}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>🎬 Welcome!</h2>
        <p>Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}

export default LoginCallback;
