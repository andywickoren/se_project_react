// import { defaultClothingItems } from "../../utils/constants";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("*******************");
  console.log(currentUser);
  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p>Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      {clothingItems.length === 0 && (
        <p className="clothes-section__no-items">No items found. Add some!</p>
      )}

      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
