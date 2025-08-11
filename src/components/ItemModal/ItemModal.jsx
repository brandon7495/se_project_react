import "./ItemModal.css";

import closeButtonWhite from "../../assets/close-white.svg";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
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
        <button className="item-modal__delete-button" onClick={onDelete}>
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
