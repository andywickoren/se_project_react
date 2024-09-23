import "./ItemModal.css";

function ItemModal({ card, handleCloseClick, deleteItem }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close modal__close_white"
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
            <div className="modal__delete-item">
              <button
                className="modal__delete-item_button"
                onClick={() => deleteItem(card)}
              >
                Delete item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
