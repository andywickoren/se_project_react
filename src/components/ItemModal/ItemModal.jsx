import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
