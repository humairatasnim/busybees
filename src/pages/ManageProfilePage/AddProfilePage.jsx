import ProfileForm from "../../components/ProfileForm/ProfileForm";

function AddProfilePage({ setProfiles }) {
  return (
    <main>
      <h1>New Profile</h1>
      <ProfileForm setProfiles={setProfiles} />
    </main>
  );
}

export default AddProfilePage;
