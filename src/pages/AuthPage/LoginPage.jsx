import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AuthPage.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    const submitLoginForm = async () => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/login`,
          formData
        );
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("loginStateChange"));
        alert("Login successful!");
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    submitLoginForm();
  };

  return (
    <main>
      <h2>Login to BusyBees</h2>
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
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </main>
  );
}

export default LoginPage;
