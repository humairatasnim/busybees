import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
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
      <div className="header__logo">
        <Link to="/" className="header__link">
          🐝 BusyBees
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              className="nav__link"
              activeclassname="nav__link--active"
            >
              Chores
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/family"
              className="nav__link"
              activeclassname="nav__link--active"
            >
              Family
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/rewards"
              className="nav__link"
              activeclassname="nav__link--active"
            >
              Rewards
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    // <header className="header">
    //   <Link to="/">
    //     <h1>🐝 BusyBees</h1>
    //   </Link>
    //   <nav>
    //     <Link to="/family">Family</Link>
    //     <Link to="/chores">Chores</Link>
    //     <Link to="/rewards">Rewards</Link>
    //     {!isLoggedIn && <Link to="/login">Login</Link>}
    //     {isLoggedIn && (
    //       <>
    //         <button onClick={handleLogout}>Log Out</button>
    //       </>
    //     )}
    //   </nav>
    // </header>
  );
}

export default Header;
