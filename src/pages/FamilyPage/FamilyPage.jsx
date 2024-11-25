import { Link } from "react-router-dom";

function FamilyPage({ profiles }) {
  return (
    <main>
      <h2>Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <Link to={`/profiles/${profile.id}`}>
              <p>{profile.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/profiles/new`}>Add Profile</Link>
    </main>
  );
}

export default FamilyPage;
