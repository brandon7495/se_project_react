import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span
        className="toggle-switch__text toggle-switch__text_f"
        style={{ color: `${currentTemperatureUnit === "F" ? "#fff" : ""}` }}
      >
        F
      </span>
      <span
        className="toggle-switch__text toggle-switch__text_c"
        style={{ color: `${currentTemperatureUnit === "C" ? "#fff" : ""}` }}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
