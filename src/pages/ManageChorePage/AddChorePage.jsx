import ChoreForm from "../../components/ChoreForm/ChoreForm";
import "./ManageChorePage.scss";

function AddChorePage({ profiles, setChores }) {
  return (
    <main>
      <h1>New Chore</h1>
      <ChoreForm profiles={profiles} setChores={setChores} />
    </main>
  );
}

export default AddChorePage;
