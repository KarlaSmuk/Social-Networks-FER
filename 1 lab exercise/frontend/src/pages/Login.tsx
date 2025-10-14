import GoogleButton from "react-google-button";

function Login() {
  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}`;
  };

  return (
    <div>
      <h2>Welcome to the App</h2>
      <GoogleButton type="dark" onClick={googleLogin} />
    </div>
  );
}

export default Login;
