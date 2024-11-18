import "./Header.css";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleSignUpClick,
  handleLoginClick,
  handleAddClick,
  isLoggedIn,
  weatherData,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { name } = useContext(CurrentUserContext);

  // console.log("*******************************");
  // console.log(isLoggedIn);
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
        {!isLoggedIn ? (
          <>
            <button
              onClick={handleSignUpClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__add-clothes-btn"
            >
              Log in
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Item
            </button>
            <Link to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                <Avatar sizeClass="avatar-small" />
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
