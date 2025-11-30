import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const RegisterModal = ({
  isOpen,
  onClose,
  onRegisterModalSubmit,
  handleLoginClick,
}) => {
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
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="register-imageUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="register-imageUrl"
          name="imageUrl"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <button
        type="button"
        className="register-modal__secondary-button"
        onClick={handleLoginClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
