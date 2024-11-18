import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar({ handleEditProfileClick }) {
  return (
    <>
      <div className="sidebar">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">Terence Tegegne</p>
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
          onClick={handleEditProfileClick}
          type="button"
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default SideBar;
