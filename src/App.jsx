import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import LoginPage from "./pages/AuthPage/LoginPage";

import ChoreDetailsPage from "./pages/ChoreDetailsPage/ChoreDetailsPage";
import AddChorePage from "./pages/ManageChorePage/AddChorePage";
import EditChorePage from "./pages/ManageChorePage/EditChorePage";

import FamilyPage from "./pages/FamilyPage/FamilyPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddProfilePage from "./pages/ManageProfilePage/AddProfilePage";
import EditProfilePage from "./pages/ManageProfilePage/EditProfilePage";

import RewardsPage from "./pages/RewardsPage/RewardsPage";
import RewardDetailsPage from "./pages/RewardDetailsPage/RewardDetailsPage";
import AddRewardPage from "./pages/ManageRewardPage/AddRewardPage";
import EditRewardPage from "./pages/ManageRewardPage/EditRewardPage";

import "./App.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [chores, setChores] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [rewards, setRewards] = useState(null);

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

  const getRewards = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/rewards`);
      setRewards(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    getChores();
    getProfiles();
    getRewards();
  }, []);

  if (!chores || !profiles) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage chores={chores} profiles={profiles} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/chores" element={<HomePage chores={chores} profiles={profiles} />} />
        <Route path="/chores/:id" element={<ChoreDetailsPage setChores={setChores} />} />
        <Route path="/chores/new" element={<AddChorePage profiles={profiles} setChores={setChores} />} />
        <Route path="/chores/:id/edit" element={ <EditChorePage chores={chores} profiles={profiles} setChores={setChores} />} />

        <Route path="/family" element={<FamilyPage profiles={profiles} />} />
        <Route path="/profiles/:id" element={<ProfilePage setProfiles={setProfiles} />} />
        <Route path="/profiles/new" element={<AddProfilePage setProfiles={setProfiles} />} />
        <Route path="/profiles/:id/edit" element={<EditProfilePage profiles={profiles} setProfiles={setProfiles} />} />

        <Route path="/rewards" element={<RewardsPage rewards={rewards} />} />
        <Route path="/rewards/:id" element={<RewardDetailsPage setRewards={setRewards} />} />
        <Route path="/rewards/new" element={<AddRewardPage setRewards={setRewards} />} />
        <Route path="/rewards/:id/edit" element={<EditRewardPage rewards={rewards} setRewards={setRewards} />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
