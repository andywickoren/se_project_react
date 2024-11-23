import React, { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ card, handleCloseClick, handleDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(`{Card Owner: ${card.owner}`);
  console.log(`{Current User: ${currentUser._id}`);
  console.log("Current User:", currentUser);
  const isOwn = String(card.owner) === String(currentUser._id);
  const itemDeleteButtonClassName = `modal__delete-item_button ${
    isOwn
      ? "modal__delete-item_button_visible"
      : "modal__delete-item_button_hidden"
  }`;
  // console.log("Current User:", currentUser);
  // console.log("Card:", card);

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_white"
          aria-label="close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_container">
            <div className="modal__clothing-info">
              <h2 className="modal__clothing-info_caption">{card.name}</h2>
              <p className="modal__clothing-info_weather">
                Weather: {card.weather}
              </p>
            </div>
            {/* <div className="modal__delete-item"> */}
            {isOwn && (
              <button
                className={itemDeleteButtonClassName}
                onClick={handleDeleteClick}
                type="button"
              >
                Delete item
              </button>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
