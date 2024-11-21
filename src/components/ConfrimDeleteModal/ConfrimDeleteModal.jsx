import React, { useState } from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ handleCloseClick, handleDelete }) {
  // const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="modal modal_opened">
      <div className="modal__content_delete-modal">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
          aria-label="close"
        />
        <div className="delete-modal__warnings">
          <p className="delete-modal__text-first">
            Are you sure you want to delete this item?
          </p>
          <p className="delete-modal__text-last">
            This action is irreversible.
          </p>

          <button
            onClick={handleDelete}
            type="button"
            className="delete-modal__confirm-delete-button"
            // disabled={isDeleting}
          >
            Yes, delete item
            {/* {isDeleting ? "Deleting..." : "Yes, delete item"} */}
          </button>
          <button
            onClick={handleCloseClick}
            type="button"
            className="delete-modal__cancel-button"
            // disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
