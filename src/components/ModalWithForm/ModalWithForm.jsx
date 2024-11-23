import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
}) {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseClick();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
          aria-label="close"
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
