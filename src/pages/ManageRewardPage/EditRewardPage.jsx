import { useParams } from "react-router-dom";
import RewardForm from "../../components/RewardForm/RewardForm";

function EditRewardPage({ rewards, setRewards }) {
  const { id } = useParams();
  const rewardId = parseInt(id, 10);
  const rewardToEdit = rewards.find((reward) => reward.id === rewardId);

  return (
    <main>
      <h1>Edit Reward</h1>
      <RewardForm reward={rewardToEdit} setRewards={setRewards} />
    </main>
  );
}

export default EditRewardPage;
