import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm/";

function RegisterModal({
  closeActiveModal,
  handleRegistration,
  isOpen,
  openLoginModal,
  isLoading,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      handleCloseClick={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        className="modal__input"
        id="email"
        name="email"
        value={values.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <label htmlFor="password" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        className="modal__input"
        id="password"
        name="password"
        value={values.password}
        placeholder="Password"
        onChange={handleChange}
      />
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
      <label htmlFor="avatarUrl" className="modal__label">
        AvatarURL
      </label>
      <input
        type="url"
        className="modal__input"
        id="avatar"
        name="avatar"
        value={values.avatar}
        placeholder="Avatar URL"
        onChange={handleChange}
      />
      <div className="modal__buttons-wrapper">
        <button type="submit" className="modal__submit" disabled={isLoading}>
          {isLoading ? "Registering" : "Next"}
        </button>
        <button
          type="button"
          className="modal__or-login-btn"
          onClick={openLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
export default RegisterModal;
