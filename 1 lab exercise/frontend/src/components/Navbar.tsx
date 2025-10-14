import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬🌤️ WeatherFlix
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/recommendations" className="nav-link">
            Recommendations
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
