import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [chores, setChores] = useState(null);

  const getChores = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/chores`);
      setChores(data);
    } catch (error) {
      console.error("Error fetching chores:", error);
    }
  };

  useEffect(() => {
    getChores();
  }, []);

  if (!chores) return <div>Loading chores...</div>;

  return (
    <main>
      <h2>Chores</h2>
      <ul>
        {chores.map((chore) => (
          <li key={chore.id}>{chore.title}</li>
        ))}
      </ul>
    </main>
  );
}

export default HomePage;
