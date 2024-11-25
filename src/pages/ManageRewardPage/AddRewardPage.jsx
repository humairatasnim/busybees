import RewardForm from "../../components/RewardForm/RewardForm";

function AddRewardPage({ setRewards }) {
  return (
    <main>
      <h1>New Reward</h1>
      <RewardForm setRewards={setRewards} />
    </main>
  );
}

export default AddRewardPage;
