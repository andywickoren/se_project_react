import React, { useContext } from "react";
import "./Avatar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Avatar({ sizeClass }) {
  const { currentUser } = useContext(CurrentUserContext);
  const avatarClass = sizeClass || ""; // Default to an empty string if no sizeClass is provided

  // Determine whether an avatar exists
  const hasAvatar = currentUser.avatar && currentUser.avatar !== "";

  return (
    <div className={`avatar ${avatarClass}`}>
      {hasAvatar ? (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name}'s avatar`}
          className={`avatar__image ${avatarClass}`}
        />
      ) : (
        <div className={`avatar__circle ${avatarClass}`}>
          {currentUser.name?.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}

export default Avatar;
