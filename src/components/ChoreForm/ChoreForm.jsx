import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import "./ChoreForm.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function ChoreForm({ chore = null, profiles, setChores }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(chore ? chore.title : "");

  const [description, setDescription] = useState(
    chore ? chore.description : ""
  );

  const [rewardPoints, setRewardPoints] = useState(
    chore ? chore.reward_points : 0
  );

  const [profileId, setProfileId] = useState(
    chore ? chore.profile_id : profiles[0]?.id
  );

  const [emoji, setEmoji] = useState(chore ? chore.emoji : "");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      reward_points: parseInt(rewardPoints, 10),
      emoji,
      profile_id: parseInt(profileId, 10),
    };

    const submitChore = async () => {
      try {
        if (chore) {
          // Update existing chore
          const { data } = await axios.put(
            `${BASE_URL}/api/chores/${chore.id}`,
            formData
          );

          setChores((prevChores) =>
            prevChores.map((c) => (c.id === chore.id ? data : c))
          );

          alert("Chore updated successfully!");
        } else {
          // Add new chore
          const { data } = await axios.post(`${BASE_URL}/api/chores`, formData);

          setChores((prevChores) => [...prevChores, data]);

          alert("Chore added successfully!");
        }
        navigate(-1);
      } catch (error) {
        console.error("Error submitting chore:", error);
      }
    };

    submitChore();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const toggleEmojiPicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handleEmojiClick = (emojiData, e) => {
    setEmoji(emojiData.imageUrl);
    setIsPickerVisible(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Emoji</label>
        {emoji ? (
          <>
            <img src={emoji} alt="Chore emoji" />
            <button type="button" onClick={toggleEmojiPicker}>
              Change Emoji
            </button>
          </>
        ) : (
          <button type="button" onClick={toggleEmojiPicker}>
            Choose Emoji
          </button>
        )}

        {isPickerVisible && (
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            previewConfig={{
              showPreview: false,
            }}
          />
        )}
      </div>
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
              {profile.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{chore ? "Save Changes" : "Add Chore"}</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ChoreForm;
