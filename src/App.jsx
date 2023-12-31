import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { Navbar } from "./components/Navbar/Navbar";
import { toggleLoader } from "./config/LoaderReducer";
import { URL } from "./config/data.js";
import { login } from "./config/userReducer.js";
import AdminContestPage from "./pages/AdminContestPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { ContestPage } from "./pages/ContestPage";
import CreateContest from "./pages/CreateContest.jsx";
import { HomePage } from "./pages/HomePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LoginPage } from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import { SignUpPage } from "./pages/SignUpPage";
import VotingPage from "./pages/VotingPage.jsx";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loaderActive } = useSelector((state) => state.loaderState);

  useEffect(() => {

    async function getuser() {
      dispatch(toggleLoader(true))
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
      finally {
        dispatch(toggleLoader(false))
      }
    }
    getuser();
  }, []);
  return (
    <div className="app-outer-container">

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contests" element={<ContestPage />} />
        <Route path="/vote/:idx" element={<VotingPage />} />
        <Route path="/result/:idx" element={<ResultPage />} />
        <Route path="/admin/contest/:idx" element={<AdminContestPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/new_contest" element={<CreateContest />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>


    </div>
  );
}

export default App;
