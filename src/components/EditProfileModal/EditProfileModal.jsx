import React, { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

export function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
  });

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      handleCloseClick={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
      </label>
      <input
        type="text"
        name="name"
        className="modal__input"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
      />

      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *{" "}
      </label>
      <input
        type="url"
        name="avatar"
        className="modal__input"
        id="avatarurl"
        placeholder="Avatar URL"
        value={values.avatar}
        onChange={handleChange}
      />

      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
