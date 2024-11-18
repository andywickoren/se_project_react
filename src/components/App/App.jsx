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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";

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
    console.log("did we make it into resgistration");
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
          console.log(res.token);
          setToken(res.token);
          setUserData(res.user);
          setIsLoggedIn(true);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const onEditProfile = () => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile(data, token)
      .then((res) => {
        setCurrentUser(res.data);
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
    console.log("weatherData:", weatherData);
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

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const [clothingItems, setClothingItems] = useState([]);

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

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
            {activeModal === "edit-profile" && (
              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={closeActiveModal}
                onEditProfile={onEditProfile}
              />
            )}
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
