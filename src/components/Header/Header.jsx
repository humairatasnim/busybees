import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>🐝 BusyBees</h1>
      </Link>
    </header>
  );
}

export default Header;
