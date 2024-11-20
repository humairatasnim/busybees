import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ChoreDetailsPage from "./pages/ChoreDetailsPage/ChoreDetailsPage";
import "./App.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage chores={chores} />} />
        <Route
          path="/chores/:id"
          element={<ChoreDetailsPage chores={chores} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
