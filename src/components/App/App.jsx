import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  postItems,
  deleteItems,
  updateProfile,
} from "../../utils/api";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Guest",
    email: "",
    avatar: "",
  });

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignupClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: "Guest", email: "", avatar: "" });
    localStorage.removeItem("jwt");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  const handleCardDelete = () => {
    deleteItems(selectedCard._id, localStorage.getItem("jwt"))
      .then(() => {
        const filtered = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(filtered);
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to delete item:", error));
  };

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }) => {
    setIsLoading(true);
    return postItems({
      name,
      weather,
      imageUrl,
      token: localStorage.getItem("jwt"),
    })
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to add item:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterModalSubmit = ({ email, password, name, imageUrl }) => {
    setIsLoading(true);
    return signup({ email, password, name, avatar: imageUrl })
      .then(() => {
        return signin({ email, password });
      })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeActiveModal();
        localStorage.setItem("jwt", res.token);
      })
      .catch((error) => console.error("Registration failed:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    setIsLoading(true);
    return signin({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeActiveModal();
        localStorage.setItem("jwt", res.token);
      })
      .catch((error) => console.error("Login failed:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    return updateProfile({
      name,
      avatar,
      token: localStorage.getItem("jwt"),
    })
      .then(() => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name,
          avatar,
        }));
        closeActiveModal();
      })
      .catch((error) => console.error("Profile update failed:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleSignupClick={handleSignupClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      currentUser={currentUser}
                      onEditProfileClick={handleEditProfileClick}
                      onLogoutClick={handleLogoutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegisterModalSubmit={handleRegisterModalSubmit}
            handleLoginClick={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLoginModalSubmit={handleLoginModalSubmit}
            handleSignupClick={handleSignupClick}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
            currentUser={currentUser}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleEditProfileSubmit}
            currentUser={currentUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
