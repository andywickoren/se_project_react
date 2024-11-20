import avatar from "../../assets/avatar.png";
import "./SideBar.css";
import Avatar from "../Avatar/Avatar";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleLogOutClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <div className="sidebar">
        <Avatar sizeClass="avatar-large" />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__change-profile-btn"
          onClick={handleEditProfileClick}
          type="button"
        >
          Change profile data
        </button>
        <button
          className="sidebar__logout-btn"
          onClick={() => {
            handleLogOutClick();
          }}
          type="button"
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default SideBar;
