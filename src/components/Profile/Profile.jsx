import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  handleLogOutClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleLogOutClick={handleLogOutClick}
        />
      </section>
      <ClothesSection
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
