import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import "./RegisterModal.css";
// import { useState } from "react";
// import { useForm } from "../../hooks/useForm/";

function RegisterModal({
  closeActiveModal,
  handleRegistration,
  isOpen,
  openLoginModal,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onRegistration = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await handleRegistration(data);
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      handleCloseClick={closeActiveModal}
      isOpen={isOpen}
      onSubmit={onRegistration}
    >
      <label htmlFor="email" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        className="modal__input"
        id="email"
        name="email"
        value={data.email}
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
        value={data.password}
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
        value={data.name}
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
        value={data.avatar}
        placeholder="Avatar URL"
        onChange={handleChange}
      />
      <div className="modal__buttons-wrapper">
        {/* <button type="submit" className="modal__submit">
          Sign Up
        </button> */}
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
