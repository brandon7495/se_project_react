import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import React from "react";

const EditProfileModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values).then(() => {
      setValues({
        name: "",
        imageUrl: "",
      });
    });
  };

  React.useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name || "",
        imageUrl: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
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
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
