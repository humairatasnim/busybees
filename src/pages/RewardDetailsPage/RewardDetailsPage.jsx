import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function RewardDetailsPage({ setRewards }) {
  const navigate = useNavigate();

  const { id } = useParams();
  const rewardId = parseInt(id, 10);

  const [reward, setReward] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const getRewardDetails = async () => {
    try {
      // Fetch reward details
      const rewardResponse = await axios.get(
        `${BASE_URL}/api/rewards/${rewardId}`
      );
      setReward(rewardResponse.data);

      // Fetch profiles that redeemed this reward
      const profilesResponse = await axios.get(
        `${BASE_URL}/api/redemptions/reward/${rewardId}`
      );
      setProfiles(profilesResponse.data);
    } catch (error) {
      console.error("Error fetching reward details:", error);
    }
  };

  useEffect(() => {
    getRewardDetails();
  }, [rewardId]);

  const handleEditReward = (e) => {
    e.preventDefault();
    navigate(`/rewards/${reward.id}/edit`);
  };

  const handleDeleteReward = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reward?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/rewards/${reward.id}`);
      setRewards((prevRewards) =>
        prevRewards.filter((r) => r.id !== reward.id)
      );
      alert("Reward deleted successfully!");
      navigate("/rewards");
    } catch (error) {
      console.error("Error deleting reward:", error);
      alert("There was an error deleting the reward. Please try again.");
    }
  };

  if (!reward) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Reward Details</h1>
      <h2>{reward.title}</h2>
      <p>Points Required: {reward.points_required}</p>
      <button type="button" onClick={handleEditReward}>
        Edit Reward
      </button>
      <button type="button" onClick={handleDeleteReward}>
        Delete Reward
      </button>

      <h2>Profiles Redeemed</h2>
      {profiles.length > 0 ? (
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <h3>{profile.name}</h3>
              <p>Date redeemed: {profile.created_at}</p>
              <button
                type="button"
                onClick={() => navigate(`/profiles/${profile.id}`)}
              >
                View Profile
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No profiles have redeemed this reward yet.</p>
      )}
    </main>
  );
}

export default RewardDetailsPage;
