import "./ItemCard.css";
import isLikedButton from "../../assets/like.png";
import likeButton from "../../assets/like-unfilled.png";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // console.log("Item:", item);
    // console.log("Item likes:", item?.likes);
    // console.log("*********Current User:", JSON.stringify(currentUser, null, 2));
    setIsLiked(item?.likes?.some((id) => id === currentUser._id));
  }, [item.likes, currentUser._id]);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    console.log(item._id);
    onCardLike(item._id, isLiked)
      .then(() => {
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        alert("Could not like/unlike item");
        console.log(err);
      });
  };

  return (
    <li className="card">
      <div className="card__container">
        <div className="card__header">
          <h2 className="card__name">{item.name}</h2>
          {currentUser._id && (
            <img
              className={"card__like-btn"}
              type="button"
              onClick={handleLike}
              src={isLiked ? isLikedButton : likeButton}
              alt="Like button"
            />
          )}
        </div>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
