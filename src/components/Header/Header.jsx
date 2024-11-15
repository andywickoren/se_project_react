import "./Header.css";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";

function Header({
  handleSignUpClick,
  handleLoginClick,
  handleAddClick,
  isLoggedIn,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="Header logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button
          onClick={handleSignUpClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Sign Up
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terence Tegegne</p>
            <img
              src={avatar}
              alt="Terence Tegegne"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
