import "./ItemCard.css";
import unliked from "../../assets/unliked.svg";
import liked from "../../assets/liked.svg";
import { useState } from "react";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const [isLiked, setIsLiked] = useState(item.isLiked);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{item.name}</h2>
        <button className="card__like-button" onClick={toggleLike}>
          <img src={isLiked ? liked : unliked} alt="Like" />
        </button>
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
