import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import "./LoginModal.css";

function LoginModal({ isOpen, onLogin, onClose, onRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onRegister({ email: formData.email, password: formData.password });
  // };

  return (
    <ModalWithForm
      titleText="Log in"
      buttonText="Log in"
      handleCloseClick={onClose}
      isOpen={isOpen}
      name={"login"}
      // onSubmit={handleSubmit}
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
        value={formData.email}
        onChange={handleInputChange}
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
        value={formData.password}
        onChange={handleInputChange}
      />
      <div className="modal__buttons-wrapper">
        <button
          type="submit"
          className="modal__submit modal__login-btn"
          onSubmit={onLogin}
        >
          Log In
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
