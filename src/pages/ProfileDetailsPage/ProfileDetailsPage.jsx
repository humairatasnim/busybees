import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function ProfileDetailsPage({ setProfiles }) {
  const navigate = useNavigate();

  const { id } = useParams();
  const profileId = parseInt(id, 10);

  const [profile, setProfile] = useState(null);
  const [chores, setChores] = useState([]);

  const getProfileDetails = async () => {
    try {
      const profileResponse = await axios.get(
        `${BASE_URL}/api/profiles/${profileId}`
      );
      setProfile(profileResponse.data);

      const choresResponse = await axios.get(
        `${BASE_URL}/api/chores?profile_id=${profileId}`
      );
      setChores(choresResponse.data);
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
    <main>
      <h1>Profile Details</h1>
      <h2>{profile.name}</h2>
      <p>Age: {profile.age}</p>
      <p>Earned Points: {profile.earned_points}</p>
      <button type="button" onClick={handleEditProfile}>
        Edit Profile
      </button>
      <button type="button" onClick={handleDeleteProfile}>
        Delete Profile
      </button>

      <h2>Chores Assigned</h2>
      {chores.length > 0 ? (
        <ul>
          {chores.map((chore) => (
            <li key={chore.id}>
              <h3>{chore.title}</h3>
              <p>{chore.description}</p>
              <p>Points: {chore.reward_points}</p>
              <p>Status: {chore.completed ? "Completed" : "Not Completed"}</p>
              <button
                type="button"
                onClick={() => navigate(`/chores/${chore.id}`)}
              >
                View Chore
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chores assigned to this profile.</p>
      )}
    </main>
  );
}

export default ProfileDetailsPage;
