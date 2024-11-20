import React, { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
  });

  useEffect(() => {
    console.log("currentUser:", currentUser);
    console.log("data:", data);
    if (currentUser) {
      setData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(data);
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
        value={data.name}
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
        value={data.avatar}
        onChange={handleChange}
      />

      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
