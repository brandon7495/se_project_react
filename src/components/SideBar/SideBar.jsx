import "./SideBar.css";

function SideBar({ currentUser, onEditProfileClick, onLogoutClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser.name.charAt(0)}
          </div>
        )}
        <p className="sidebar__username">{currentUser.name || "Guest"}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-button"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__logout-button"
        onClick={onLogoutClick}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
