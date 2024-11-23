import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onLogin, onRegister, onClose }) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleCloseClick={onClose}
    >
      <label htmlFor="email" className="modal__label">
        Email
      </label>
      <input
        type="text"
        className="modal__input"
        id="email"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
      />
      <label htmlFor="password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        className="modal__input"
        id="password"
        name="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
      />
      <div className="modal__buttons-wrapper">
        <button type="submit" className="modal__submit modal__login-btn">
          Login
        </button>
        <button
          type="button"
          className="modal__or-signup-btn"
          onClick={onRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
