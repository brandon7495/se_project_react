import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const LoginModal = ({ isOpen, onClose, onLoginModalSubmit }) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit(values).then(() => {
      setValues({
        email: "",
        password: "",
      });
    });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
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
      <button type="button">or Sign Up</button>
    </ModalWithForm>
  );
};

export default LoginModal;
