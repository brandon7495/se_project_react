import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onEditProfileClick,
  onLogoutClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          onLogoutClick={onLogoutClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
