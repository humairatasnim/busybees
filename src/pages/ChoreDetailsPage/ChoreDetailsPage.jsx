import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ChoreDetailsPage.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function ChoreDetailsPage({ setChores }) {
  const navigate = useNavigate();

  const { id } = useParams();
  const choreId = parseInt(id, 10);

  const [chore, setChore] = useState(null);
  const [profile, setProfile] = useState(null);

  const getChoreDetails = async () => {
    try {
      const choreResponse = await axios.get(
        `${BASE_URL}/api/chores/${choreId}`
      );
      setChore(choreResponse.data);

      const profileResponse = await axios.get(
        `${BASE_URL}/api/profiles/${choreResponse.data.profile_id}`
      );
      setProfile(profileResponse.data);
    } catch (error) {
      console.error("Error fetching chore details:", error);
    }
  };

  useEffect(() => {
    getChoreDetails();
  }, [choreId]);

  const handleEditChore = (e) => {
    e.preventDefault();
    navigate(`/chores/${chore.id}/edit`);
  };

  const handleCompletionToggle = async () => {
    const action = chore.completed ? 'undo' : 'complete';

    try {
      await axios.patch(`${BASE_URL}/api/chores/${chore.id}/${action}`);

      const updatedChoreResponse = await axios.get(`${BASE_URL}/api/chores/${chore.id}`);
      setChore(updatedChoreResponse.data);

      const updatedProfileResponse = await axios.get(
        `${BASE_URL}/api/profiles/${updatedChoreResponse.data.profile_id}`
      );
      setProfile(updatedProfileResponse.data);

      setChores((prevChores) => 
        prevChores.map((c) => 
          c.id === updatedChoreResponse.data.id ? updatedChoreResponse.data : c
        )
      );

      alert(chore.completed ? "Chore marked as incomplete!" : "Chore marked as complete!");
    } catch (error) {
      console.error(`Error performing action '${action}' on chore:`, error);
      alert(`There was an error ${action}ing the chore.`);
    }
  };

  const handleDeleteChore = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chore?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/chores/${chore.id}`);
      setChores((prevChores) => prevChores.filter((c) => c.id !== chore.id));
      alert("Chore deleted successfully!");
      navigate("/chores");
    } catch (error) {
      console.error("Error deleting chore:", error);
      alert("There was an error deleting the chore. Please try again.");
    }
  };

  if (!chore || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Chore Details</h1>
      <h2>{chore.title}</h2>
      <p>{chore.description}</p>
      <p>Points: {chore.reward_points}</p>
      <p>Status: {chore.completed ? "Completed" : "Not Completed"}</p>
      <p>
        Assigned to: {profile.name} ({profile.earned_points} <i className="star-icon fa-solid fa-star"></i>)
      </p>

      <button type="button" onClick={handleEditChore}>
        Edit
      </button>
      <button type="button" onClick={handleDeleteChore}>
        Delete
      </button>

      <button type="button" onClick={handleCompletionToggle}>
        {chore.completed ? "Undo Complete" : "Mark as Complete"}
      </button>
    </main>
  );
}

export default ChoreDetailsPage;
