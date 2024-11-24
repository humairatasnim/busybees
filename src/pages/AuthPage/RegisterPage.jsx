import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AuthPage.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    const submitRegisterForm = async () => {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/register`, formData);
        console.log("User registered:", data);
        alert("Account created successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    submitRegisterForm();
  };

  return (
    <main>
      <h2>Create BusyBees Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default RegisterPage;
