import "./ItemCard.css";
import unliked from "../../assets/unliked.svg";
import liked from "../../assets/liked.svg";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(
    item.likes.some((id) => id === currentUser._id)
  );

  useEffect(() => {
    setIsLiked(item.likes.some((id) => id === currentUser._id));
  }, [item.likes, currentUser._id]);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked }).catch((error) => {
      console.error("Error updating like status:", error);
      setIsLiked(isLiked);
    });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && (
          <button className="card__like-button" onClick={handleLike}>
            <img src={isLiked ? liked : unliked} alt="Like" />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
