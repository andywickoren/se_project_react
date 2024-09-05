import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          CLOSE
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          {/* <img src="./avatar.png" alt="" className="modal__image" /> */}
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weath    er">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
