import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onLogIn, onClose, onSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn({ email: formData.email, password: formData.password });
  };

  return (
    <ModalWithForm
      titleText="Log in"
      buttonText="Log in"
      handleCloseClick={onClose}
      isOpen={isOpen}
      name={"login"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__input_type_email">
        Email
        <input
          type="text"
          className="modal__input"
          id="email"
          name="email" // Important for dynamic updates
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="password" className="modal__input_type_password">
        Password
        <input
          type="password" // Updated to password type for security
          className="modal__input"
          id="password"
          name="password" // Important for dynamic updates
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button type="submit" className="modal__submit">
          Log In
        </button>
        <button
          type="button"
          className="modal__or-signup-btn"
          onClick={onSignup}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
