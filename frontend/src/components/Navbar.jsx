import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {

    logout();

    window.location.href = "/";
  };

  return (

    <nav className="navbar">

      <div className="logo">
        📋 Task Manager
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          🏠 Dashboard
        </Link>

        <Link to="/profile">
          👤 Profile
        </Link>

        <button
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;