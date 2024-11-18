import React, { useState } from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ closeActiveModal, handleDeleteItem, onClose }) {
  // const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="modal modal_opened">
      <button
        onClick={onClose}
        type="button"
        className="modal__close"
        aria-label="close"
      />
      <p className="delete__modal-text">
        Are you sure you want to delete this item?
      </p>
      <p className="delete__modal-text">This action is irreversible.</p>
      <div className="">
        <button
          onClick={handleDeleteItem}
          type="button"
          className="modal__confirm-delete-button"
          // disabled={isDeleting}
        >
          {/* {isDeleting ? "Deleting..." : "Yes, delete item"} */}
        </button>
        <button
          onClick={closeActiveModal}
          type="button"
          className="delete__modal-cancel"
          // disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
