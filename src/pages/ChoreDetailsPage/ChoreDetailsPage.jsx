import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChoreDetailsPage.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function ChoreDetailsPage({ chores, profiles, setChores }) {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(`/`);
  };

  const handleEditChore = (e) => {
    e.preventDefault();
    navigate(`/chores/${chore.id}/edit`);
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
      navigate(-1);
    } catch (error) {
      console.error("Error deleting chore:", error);
      alert("There was an error deleting the chore. Please try again.");
    }
  };

  const handleCompleteChore = async () => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/chores/${chore.id}/complete`
      );
      setChores((prevChores) =>
        prevChores.map((c) => (c.id === chore.id ? data : c))
      );
      alert("Chore marked as complete!");
    } catch (error) {
      console.error("Error marking chore as complete:", error);
      alert("There was an error marking the chore as complete.");
    }
  };

  const { id } = useParams();
  const choreId = parseInt(id, 10);
  const chore = chores.find((chore) => chore.id === choreId);

  if (!chore) {
    return (
      <main>
        <h1>Chore Not Found</h1>
        <p>The chore you're looking for does not exist.</p>
        <button onClick={handleGoBack}>Go back</button>
      </main>
    );
  }

  const profile = profiles.find((profile) => profile.id === chore.profile_id);

  return (
    <main>
      <h1>Chore Details</h1>
      <h2>{chore.title}</h2>
      <p>{chore.description}</p>
      <p>Points: {chore.reward_points}</p>
      <p>Status: {chore.completed ? "Completed" : "Not Completed"}</p>
      <p>Assigned to: {profile.name}</p>
      <button type="button" onClick={handleEditChore}>
        Edit
      </button>
      <button type="button" onClick={handleDeleteChore}>
        Delete
      </button>
      <button
        type="button"
        onClick={handleCompleteChore}
        disabled={chore.completed}
      >
        Complete Chore!
      </button>
    </main>
  );
}

export default ChoreDetailsPage;
