// import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm/";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleWeatherType = (e) => {
    setValues({ ...values, weather: e.target.id });
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call onAddItem with the values and wait for the promise to resolve
    onAddItem(values)
      .then(() => {
        closeActiveModal(); // Call closeActiveModal only after onAddItem resolves
      })
      .catch((error) => {
        console.error("Error adding item:", error); // Handle any errors from onAddItem
      });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      handleCloseClick={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleAddItemSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        name="name"
        value={values.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <label htmlFor="imageUrl" className="modal__label">
        Image
      </label>
      <input
        type="url"
        className="modal__input"
        id="imageUrl"
        name="imageUrl"
        placeholder="Image URL"
        value={values.imageUrl}
        onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleWeatherType}
          />
          <span className="modal__span">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label-type-radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            checked={values.weather === "warm"}
            onChange={handleWeatherType}
          />
          <span className="modal__span">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label-type-radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            checked={values.weather === "cold"}
            onChange={handleWeatherType}
          />
          <span className="modal__span">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
