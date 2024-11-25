import { Link } from "react-router-dom";

function RewardsPage({ rewards }) {
  return (
    <main>
      <h2>Rewards</h2>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>
            <Link to={`/rewards/${reward.id}`}>
              <p>{reward.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/rewards/new`}>Add Reward</Link>
    </main>
  );
}

export default RewardsPage;
