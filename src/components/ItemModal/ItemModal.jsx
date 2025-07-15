import "./ItemModal.css";

import closeButtonWhite from "../../assets/close-white.svg";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close-button">
          <img src={closeButtonWhite} alt="Close button" />
        </button>
        <img src={card.link} alt="Card image" className="modal__image" />
        <div className="modal__info">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
