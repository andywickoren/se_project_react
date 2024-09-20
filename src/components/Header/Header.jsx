import "./Header.css";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="Header logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + ADD CLOTHES
      </button>
      <div className="header__user-container">
        <p className="header__username">Terence Tegegne</p>
        <img src={avatar} alt="Terence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
