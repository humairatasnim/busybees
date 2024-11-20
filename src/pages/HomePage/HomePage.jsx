import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage({ chores }) {
  return (
    <main>
      <h2>Chores</h2>
      <ul>
        {chores.map((chore) => (
          <li key={chore.id}>
            <Link to={`/chores/${chore.id}`}>
              <p>{chore.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/chores/new`}>Add Chore</Link>
    </main>
  );
}

export default HomePage;
