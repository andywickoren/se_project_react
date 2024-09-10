import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherapi";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__wrapper">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
        />
        <label htmlFor="name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
        <label htmlFor="imageUrl" className="modal__label">
          Image
        </label>
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
        />

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend_title">
            Select the weather type:
          </legend>
          <label htmlFor="hot" className="modal__label modal__label-type-radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
            />
            <span className="modal__span">Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label-type-radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />
            <span className="modal__span">Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label-type-radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />
            <span className="modal__span">Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
