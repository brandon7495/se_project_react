import { Link } from "react-router-dom";

import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  currentUser,
  handleSignupClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Wtwr Logo" className="header__logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <>
          <button
            className="header__add-button"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            {" "}
            <div className="header__profile">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <Link to="/profile" className="header__profile-link">
          {" "}
          <div className="header__profile">
            <button
              className="header__signup-button"
              type="button"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
            <button
              className="header__login-button"
              type="button"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
