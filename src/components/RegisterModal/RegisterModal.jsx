import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegisterModalSubmit }) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit(values).then(() => {
      setValues({
        email: "",
        password: "",
        name: "",
        imageUrl: "",
      });
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
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

export default RegisterModal;
