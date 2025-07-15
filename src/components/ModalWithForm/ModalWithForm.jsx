import "./ModalWithForm.css";

import closeButton from "../../assets/close.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-button">
          <img
            onClick={handleCloseClick}
            src={closeButton}
            alt="Close button"
          />
        </button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
