import { Link } from "react-router-dom";
import ChoreList from "../../components/ChoreList/ChoreList";
import "./HomePage.scss";

function HomePage({ chores, profiles }) {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1>Chores</h1>
          <Link to={`/chores/new`}>Add Chore</Link>
        </div>
        <ChoreList chores={chores} profiles={profiles} />
      </div>
    </main>
  );
}

export default HomePage;
