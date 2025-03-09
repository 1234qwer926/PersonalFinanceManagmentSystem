import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../PageCss/Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");

    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <nav className="navbar">
      <div className="logo">ExpenseHub</div>
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">&#9776;</label>
      <ul className="nav-links">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/">Explore</Link></li>
        {isAuthenticated ? (
          <li>
            <Link className="logout-btn" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
