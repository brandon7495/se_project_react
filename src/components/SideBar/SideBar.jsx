import "./SideBar.css";

function SideBar({ currentUser }) {
  return (
    <div className="sidebar">
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
  );
}

export default SideBar;
