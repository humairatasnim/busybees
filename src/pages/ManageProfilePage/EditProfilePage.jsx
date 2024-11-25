import { useParams } from "react-router-dom";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

function EditProfilePage({ profiles, setProfiles }) {
  const { id } = useParams();
  const profileId = parseInt(id, 10);
  const profileToEdit = profiles.find((profile) => profile.id === profileId);

  return (
    <main>
      <h1>Edit Profile</h1>
      <ProfileForm profile={profileToEdit} setProfiles={setProfiles} />
    </main>
  );
}

export default EditProfilePage;
