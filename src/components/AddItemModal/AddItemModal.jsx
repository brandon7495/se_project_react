import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function AddItemModal({ isOpen, onClose, onAddItemModalSubmit }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    weather: "",
    imageUrl: "",
  });
  const { name, weather, imageUrl } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values).then(() => {
      setValues({
        name: "",
        weather: "",
        imageUrl: "",
      });
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="hot"
            value="hot"
            onChange={handleChange}
            checked={weather === "hot"}
          />{" "}
          <label htmlFor="hot" className="modal__label_type_radio">
            Hot
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            value="warm"
            onChange={handleChange}
            checked={weather === "warm"}
          />{" "}
          <label htmlFor="warm" className="modal__label_type_radio">
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            value="cold"
            onChange={handleChange}
            checked={weather === "cold"}
          />{" "}
          <label htmlFor="cold" className="modal__label_type_radio">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
