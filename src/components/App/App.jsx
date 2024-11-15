import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherapi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { getItems } from "../../utils/api";
import { addItem } from "../../utils/api";
import { deleteItem } from "../../utils/api";
import * as auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatarUrl: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegistration = (data) => {
    auth.register(data);
    console.log(data);
    // .then(() => {
    //   onLogin(data);
    //   closeActiveModal();
    // })
    // .catch(console.error);
  };

  const onLogin = (data) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(data)
      .then((res) => {
        if (res.jwt) {
          setToken(res.jwt);
          setUserData(res.user);
          setIsLoggedIn(true);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
      })
      .catch(console.error);
  }, []);

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const [clothingItems, setClothingItems] = useState([]);

  const handleDelete = (item) => {
    console.log("item", item);
    const id = item._id;
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((error) => console.error(error));
  };

  const handleAddItem = (newItem) => {
    return addItem(newItem)
      .then((savedItem) => {
        setClothingItems([savedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        const temperature = filteredData.temp;
        setTemp(temperature);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        console.log(clothingItems);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log(clothingItems);
  // }, [clothingItems]);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__wrapper">
          <Header
            handleSignUpClick={handleSignUpClick}
            handleLoginClick={handleLoginClick}
            handleAddClick={handleAddClick}
            isLoggedIn={isLoggedIn}
            weatherData={weatherData}
            // temp={temp}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  weatherTemp={temp}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              card={selectedCard}
              handleCloseClick={closeActiveModal}
              deleteItem={() => handleDelete(selectedCard)}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              closeActiveModal={closeActiveModal}
              handleRegistration={handleRegistration}
              isOpen={activeModal === "register"}
              openLoginModal={handleLoginClick}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
