import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ChoreDetailsPage from "./pages/ChoreDetailsPage/ChoreDetailsPage";
import AddChorePage from "./pages/ManageChorePage/AddChorePage";
import EditChorePage from "./pages/ManageChorePage/EditChorePage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import "./App.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [chores, setChores] = useState(null);
  const [profiles, setProfiles] = useState(null);

  const getChores = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/chores`);
      setChores(data);
    } catch (error) {
      console.error("Error fetching chores:", error);
    }
  };

  const getProfiles = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/profiles`);
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    getChores();
    getProfiles();
  }, []);

  if (!chores || !profiles) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage chores={chores} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chores/:id"
          element={<ChoreDetailsPage setChores={setChores} />}
        />
        <Route
          path="/chores/new"
          element={<AddChorePage profiles={profiles} setChores={setChores} />}
        />
        <Route
          path="/chores/:id/edit"
          element={<EditChorePage chores={chores} profiles={profiles} setChores={setChores} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
