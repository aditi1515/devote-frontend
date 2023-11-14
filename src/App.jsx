import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
import { LoginPage } from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useNavigate } from "react-router-dom";
import { URL } from "./config/data.js";
import { useDispatch } from "react-redux";
import { login } from "./config/userReducer.js";
import { ContestPage } from "./pages/ContestPage";
import VotingPage from "./pages/votingPage";
function App() { 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  useEffect(() => {
    async function getuser() {
      try {
        const response = await axios.post(
          `${URL}/user/getUser`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(login(response?.data?.user));
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      }
    }
    getuser();
  }, []);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contests" element={<ContestPage />} />
        <Route path="/vote/:idx" element={<VotingPage/>} />
      </Routes>
    </>
  );
}

export default App;
