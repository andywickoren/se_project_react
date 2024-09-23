import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} />
      <section className="profile__clothing-items"></section>
    </div>
  );
}

export default Profile;
