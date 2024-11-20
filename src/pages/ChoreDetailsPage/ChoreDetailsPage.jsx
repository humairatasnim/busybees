import { useParams, useNavigate } from "react-router-dom";
import "./ChoreDetailsPage.scss";

function ChoreDetailsPage({ chores, profiles }) {
  const { id } = useParams();
  const choreId = parseInt(id, 10);
  const chore = chores.find((chore) => chore.id === choreId);
  const profile = profiles.find((profile) => profile.id === chore.profile_id);

  const navigate = useNavigate();
  const handleEditChore = (e) => {
    e.preventDefault();
    navigate(`/chores/${choreId}/edit`);
  };

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
    </main>
  );
}

export default ChoreDetailsPage;
