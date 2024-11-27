import { Link } from "react-router-dom";
import "./FamilyPage.scss";

function FamilyPage({ profiles }) {
  return (
    <main className="family container">
      <div className="family__header">
        <h1 className="family__title">Family</h1>
      </div>
      <section className="family__grid">
        {profiles.map((profile) => (
          <Link
            to={`/profiles/${profile.id}`}
            key={profile.id}
            className="profile"
          >
            <div className="profile__image-wrapper">
              <img
                src={profile.avatar}
                alt={`Avatar of ${profile.name}`}
                className="profile__image"
              />
            </div>

            <div className="profile__details">
              <div className="profile__name">{profile.name}</div>
              <div className="profile__points">
                {profile.earned_points}&nbsp;
                <i className="star-icon fa-solid fa-star"></i>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <div className="family__cta">
        <Link to="/profiles/new" className="family__add-button">Add Family Member</Link>
      </div>
    </main>
  );
}

export default FamilyPage;
