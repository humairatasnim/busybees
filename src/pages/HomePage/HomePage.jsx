import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage({ chores, profiles }) {
  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1>Chores</h1>
          <Link to={`/chores/new`}>Add Chore</Link>
        </div>
        <ul className="chore__list">
          {chores.map((chore) => {
            const assignee =
              profiles.find((profile) => profile.id === chore.profile_id)
                ?.name || "Unassigned";
            return (
              <li key={chore.id} className="chore__item">
                <Link to={`/chores/${chore.id}`} className="chore__link">
                  <div className="chore__title">{chore.title}</div>
                  <div className="chore__details">
                    <div className="chore__assignee">{assignee}</div>
                    <div className="chore__points">
                      {chore.reward_points}{" "}
                      <i className="chore__star fa-solid fa-star"></i>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default HomePage;
