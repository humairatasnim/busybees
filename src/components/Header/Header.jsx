import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleLoginStateChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("loginStateChange", handleLoginStateChange);
    return () => {
      window.removeEventListener("loginStateChange", handleLoginStateChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You have been logged out!");
    window.dispatchEvent(new Event("loginStateChange"));
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/">
        <h1>🐝 BusyBees</h1>
      </Link>
      <nav>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && (
          <>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
