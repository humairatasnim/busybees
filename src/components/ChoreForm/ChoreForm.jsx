import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChoreForm.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function ChoreForm({ profiles, setChores }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rewardPoints, setRewardPoints] = useState(0);
  const [profileId, setProfileId] = useState(profiles[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      reward_points: parseInt(rewardPoints, 10),
      profile_id: parseInt(profileId, 10),
    };

    const submitChore = async () => {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/chores`, formData);
        setChores((prevChores) => [...prevChores, data]);
        alert("Chore added successfully!");
        navigate(-1);
      } catch (error) {
        console.error("Error submitting chore:", error);
      }
    };

    submitChore();
  };

  const navigate = useNavigate();
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Reward Points</label>
        <input
          type="number"
          value={rewardPoints}
          onChange={(e) => setRewardPoints(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Assign to</label>
        <select
          value={profileId}
          onChange={(e) => setProfileId(e.target.value)}
        >
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name} ({profile.age})
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Chore</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ChoreForm;
