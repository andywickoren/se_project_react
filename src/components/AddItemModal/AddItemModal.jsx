import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      //   activeModal={activeModal}
      handleCloseClick={closeActiveModal}
      isOpen={isOpen}
      onSumbit={onAddItem}
    >
      {/* <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      /> */}
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
        <label htmlFor="warm" className="modal__label modal__label-type-radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
          />
          <span className="modal__span">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label-type-radio">
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
  );
};

export default AddItemModal;
