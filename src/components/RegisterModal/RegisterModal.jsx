import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import { useForm } from "../../hooks/useForm/";

const Register = ({ closeActiveModal, handleRegistration, isOpen }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onRegistration = (event) => {
    event.preventDefault();
    handleRegistration(data);
  };

  // const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  //   const { values, handleChange, setValues } = useForm({
  //     name: "",
  //     imageUrl: "",
  //     weather: "",
  //   });
  //   const handleWeatherType = (e) => {
  //     setValues({ ...values, weather: e.target.id });
  //   };

  //   const handleAddItemSubmit = (e) => {
  //     e.preventDefault();
  //     onAddItem(values);
  //   };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      handleCloseClick={closeActiveModal}
      isOpen={isOpen}
      onSubmit={onRegistration}
    >
      <label htmlFor="email" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        className="modal__input"
        id="email"
        name="email"
        value={data.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <label htmlFor="password" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        className="modal__input"
        id="password"
        name="password"
        value={data.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <label htmlFor="name" className="modal__label">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="name"
        name="name"
        value={data.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <label htmlFor="avatarUrl" className="modal__label">
        AvatarURL
      </label>
      <input
        type="url"
        className="modal__input"
        id="avatarUrl"
        name="avatarUrl"
        value={data.avatarUrl}
        placeholder="Avatar URL"
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};
export default Register;
