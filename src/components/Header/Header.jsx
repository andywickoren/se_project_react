// import "./App.css";

// function App() {
//   return (
//     <div className="app">
//       <div className="app__wrapper"></div>Hello
//     </div>
//   );
// }

// export default App;

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
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