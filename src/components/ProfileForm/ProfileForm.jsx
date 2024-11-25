import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function ProfileForm({ profile = null, setProfiles }) {
  const navigate = useNavigate();

  const [name, setName] = useState(profile ? profile.name : "");

  const [age, setAge] = useState(profile ? profile.age : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      age: parseInt(age, 10),
      user_id: 1,
    };

    const submitProfile = async () => {
      try {
        if (profile) {
          // Update existing profile
          const { data } = await axios.put(
            `${BASE_URL}/api/profiles/${profile.id}`,
            formData
          );

          setProfiles((prevProfiles) =>
            prevProfiles.map((p) => (p.id === profile.id ? data : p))
          );

          alert("Profile updated successfully!");
        } else {
          // Add new profile
          const { data } = await axios.post(
            `${BASE_URL}/api/profiles`,
            formData
          );

          setProfiles((prevProfiles) => [...prevProfiles, data]);

          alert("Profile added successfully!");
        }
        navigate(-1);
      } catch (error) {
        console.error("Error submitting profile:", error);
      }
    };

    submitProfile();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <button type="submit">{profile ? "Save Changes" : "Add Profile"}</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ProfileForm;
