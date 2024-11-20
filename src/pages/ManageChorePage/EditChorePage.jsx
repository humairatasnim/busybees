import { useParams } from "react-router-dom";
import ChoreForm from "../../components/ChoreForm/ChoreForm";
import "./ManageChorePage.scss";

function EditChorePage({ chores, profiles, setChores }) {
  const { id } = useParams();
  const choreId = parseInt(id, 10);
  const choreToEdit = chores.find((chore) => chore.id === choreId);

  return (
    <main>
      <h1>Edit Chore</h1>
      <ChoreForm chore={choreToEdit} profiles={profiles} setChores={setChores} />
    </main>
  );
}

export default EditChorePage;
