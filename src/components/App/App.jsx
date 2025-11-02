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

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, postItems, deleteItems } from "../../utils/api";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { signup, signin, checkToken } from "../../utils/auth";
import { use } from "react";

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
    deleteItems(selectedCard._id)
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
    return postItems({ name, weather, imageUrl })
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
      .then(() => {
        setIsLoggedIn(true);
        closeActiveModal();
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
        closeActiveModal();
        localStorage.setItem("jwt", res.token);
      })
      .catch((error) => console.error("Login failed:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then(() => {
          setIsLoggedIn(true);
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
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLoginModalSubmit={handleLoginModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
