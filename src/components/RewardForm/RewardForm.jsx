import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function RewardForm({ reward = null, setRewards }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(reward ? reward.title : "");
  const [pointsRequired, setPointsRequired] = useState(
    reward ? reward.points_required : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      points_required: parseInt(pointsRequired, 10),
    };

    const submitReward = async () => {
      try {
        if (reward) {
          // Update existing reward
          const { data } = await axios.put(
            `${BASE_URL}/api/rewards/${reward.id}`,
            formData
          );

          setRewards((prevRewards) =>
            prevRewards.map((r) => (r.id === reward.id ? data : r))
          );

          alert("Reward updated successfully!");
        } else {
          // Add new reward
          const { data } = await axios.post(
            `${BASE_URL}/api/rewards`,
            formData
          );

          setRewards((prevRewards) => [...prevRewards, data]);

          alert("Reward added successfully!");
        }
        navigate(-1); // Navigate back to previous page after submission
      } catch (error) {
        console.error("Error submitting reward:", error);
        alert("Error submitting reward. Please try again.");
      }
    };

    submitReward();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1); // Navigate back to previous page without saving
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
        <label>Points Required</label>
        <input
          type="number"
          value={pointsRequired}
          onChange={(e) => setPointsRequired(e.target.value)}
          required
        />
      </div>
      <button type="submit">{reward ? "Save Changes" : "Add Reward"}</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default RewardForm;
