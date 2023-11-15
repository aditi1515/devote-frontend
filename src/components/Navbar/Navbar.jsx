import React from "react";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../config/userReducer";

import { useNavigate } from "react-router-dom";
import { URL } from "../../config/data.js";

export const Navbar = () => {
  const userState = useSelector((state) => state.userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSignout() {
    const res = await axios.post(`${URL}/user/logout`, {});

    console.log(res);
    dispatch(logout());
    navigate("/login");
  }

  
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <span className="logo">
          <Link to="/" className="logo">
            DeVote
          </Link>
        </span>
        {userState?.isAuthenticated && (
          <ul className="options-list">
            <li>
              {" "}
              <Link className="options-list" to="/">
                HOME
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="options-list"
                to="/contests"
              >
                CONTESTS
              </Link>
            </li>
            {/* <li>
              {" "}
              <Link className="options-list" to="/leaderboard">
                LEADERBOARD
              </Link>
            </li> */}
          </ul>
        )}
      </div>
      {userState.isAuthenticated && (
        <div className="navbar-right">
          {/* <button className="btn-1">BECOME CANDIDATE</button> */}
          <button className="btn-2" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
