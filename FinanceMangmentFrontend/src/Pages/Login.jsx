import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../PageCss/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token); 

        window.dispatchEvent(new Event("authChange"));

        navigate("/"); 
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
