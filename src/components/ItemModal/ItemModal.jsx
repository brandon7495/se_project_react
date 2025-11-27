import "./ItemModal.css";

import closeButtonWhite from "../../assets/close-white.svg";
import useModalClose from "../../hooks/useModalClose";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ onClose, card, onDelete, isOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="item-modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button modal__close-button_type_white"
        >
          <img src={closeButtonWhite} alt="Close button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__info">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button className="item-modal__delete-button" onClick={onDelete}>
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
