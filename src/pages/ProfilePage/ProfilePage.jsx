import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ChoreList from "../../components/ChoreList/ChoreList";
import "./ProfilePage.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function ProfilePage({ setProfiles }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const profileId = parseInt(id, 10);

  const [profile, setProfile] = useState(null);
  const [chores, setChores] = useState([]);
  const [redemptions, setRedemptions] = useState([]);

  const getProfileDetails = async () => {
    try {
      // Fetch profile details
      const profileResponse = await axios.get(
        `${BASE_URL}/api/profiles/${profileId}`
      );
      setProfile(profileResponse.data);

      // Fetch chores assigned to the profile
      const choresResponse = await axios.get(
        `${BASE_URL}/api/chores?profile_id=${profileId}`
      );
      setChores(choresResponse.data);

      // Fetch rewards redeemed by the profile
      const redemptionsResponse = await axios.get(
        `${BASE_URL}/api/redemptions/profile/${profileId}`
      );
      setRedemptions(redemptionsResponse.data);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, [profileId]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    navigate(`/profiles/${profile.id}/edit`);
  };

  const handleDeleteProfile = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/profiles/${profile.id}`);
      setProfiles((prevProfiles) =>
        prevProfiles.filter((p) => p.id !== profile.id)
      );
      alert("Profile deleted successfully!");
      navigate("/profiles");
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("There was an error deleting the profile. Please try again.");
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="profile-page">
      <section className="profile-page__panel name__panel">
        <div className="profile-page__header">
          <div className="profile__image-wrapper">
            <img
              src={profile.avatar}
              alt={`Avatar of ${profile.name}`}
              className="profile__image"
            />
          </div>
          <h1 className="profile-page__title">{profile.name}</h1>
          <div className="profile__points">
            {profile.earned_points}&nbsp;
            <i className="star-icon fa-solid fa-star"></i>
          </div>
        </div>

        <div className="profile-page__actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={handleEditProfile}
          >
            Edit
          </button>
          <button
            type="button"
            className="button button-delete"
            onClick={handleDeleteProfile}
          >
            Delete
          </button>
        </div>
      </section>

      <div className="chores-rewards">
        <section className="profile-page__panel chores__panel">
          <h2>Chores Assigned</h2>
          {chores.length > 0 ? (
            <ChoreList chores={chores} profiles={[profile]} />
          ) : (
            <p>No chores assigned to this profile.</p>
          )}
        </section>

        <section className="profile-page__panel rewards__panel">
          <h2>Rewards Redeemed</h2>
          {redemptions.length > 0 ? (
            <ul>
              {redemptions.map((reward) => (
                <li key={reward.id}>
                  <h3>{reward.title}</h3>
                  <p>Points Required: {reward.points_required}</p>
                  <p>
                    Redeemed On:{" "}
                    {new Date(reward.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rewards redeemed by this profile.</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
