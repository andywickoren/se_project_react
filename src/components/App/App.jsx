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
import { addCardLike } from "../../utils/api";
import { removeCardLike } from "../../utils/api";
import { deleteItem } from "../../utils/api";
import * as auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";
import ConfirmDeleteModal from "../ConfrimDeleteModal/ConfrimDeleteModal";
import LoginModal from "../LoginModal/LoginModal";

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
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleRegistration = (data) => {
    console.log("made it into resgistration");
    auth
      .register(data)
      .then(() => {
        onLogin(data);
      })
      .catch(console.error);
  };

  const onLogin = (data) => {
    if (!email || !password) {
      console.log("no email");
      return;
    }

    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          console.log(">>LOGIN", res);
          setToken(res.token);
          auth.getUserInfo(res.token).then((user) => setCurrentUser(user));
          setIsLoggedIn(true);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  //HERE -----
  const onEditProfile = (data) => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile(data, token)
      .then(() => {
        auth.getUserInfo(token).then((user) => setCurrentUser(user));
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then(({ name, email, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar, _id });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("currentUser:", currentUser);
    // console.log("weatherData:", weatherData);
  }, [isLoggedIn, currentUser, weatherData]);

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

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const [clothingItems, setClothingItems] = useState([]);

  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? addCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard.data : item))
          );
        })
      : removeCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard.data : item))
          );
        });
  };

  const handleDelete = (item) => {
    const jwt = localStorage.getItem("jwt");
    console.log("item", item);
    const id = item._id;
    deleteItem(id, jwt)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((error) => console.error(error));
  };

  const handleAddItem = (newItem) => {
    const jwt = localStorage.getItem("jwt");
    return addItem(newItem, jwt)
      .then((savedItem) => {
        setClothingItems([savedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      avatar: "",
      _id: "",
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

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="app__wrapper">
            <Header
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
              currentUser={currentUser}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOutClick={handleLogOutClick}
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
                handleDeleteClick={handleDeleteClick}
              />
            )}
            {activeModal === "confirm-delete" && (
              <ConfirmDeleteModal
                card={selectedCard}
                handleCloseClick={closeActiveModal}
                handleDelete={() => handleDelete(selectedCard)}
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
            {activeModal === "edit-profile" && (
              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={closeActiveModal}
                onEditProfile={onEditProfile}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                isOpen={activeModal === "login"}
                onClose={closeActiveModal}
                onLogin={onLogin}
                onRegister={handleSignUpClick}
              />
            )}
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
