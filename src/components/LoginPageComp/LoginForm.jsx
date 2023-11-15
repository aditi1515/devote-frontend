import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLoader } from "../../config/LoaderReducer.js";
import { URL } from "../../config/data.js";
import { login } from "../../config/userReducer.js";
import "./loginform.scss";
export const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loaderActive } = useSelector((state) => state.loaderState);
  async function handleSignIn() {
    dispatch(toggleLoader(true))
    try {
      const response = await axios.post(
        `${URL}/user/login`,
        {
          userID: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        }
      );

      dispatch(login(response?.data?.user));
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(toggleLoader(false))
    }

    navigate("/");
  }
  return (
    <div className="loginform-main-container">
      <div className="loginpage-imageContainer">
        <img className="loginpage-image" src="loginImg.png" />
      </div>
      <div className="login-form">
        <h2 className="login-heading">LOGIN</h2>
        <div className="form-fields">
          {" "}
          <h3 className="field-label">Username</h3>
          <input
            type="text"
            className="form-inputs"
            onChange={(e) => setUsername(e.target.value)}
          />
          <h3 className="field-label">Password</h3>
          <input
            type="text"
            className="form-inputs"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signin-forgotPass">
          {" "}
          <button className="signIn-btn" onClick={handleSignIn}>
            Sign In
          </button>
          <p className="forgot-pass">forgot password?</p>
        </div>
        <p className="sign-up">
          Not registered yet? <span className="signup-Link">Sign Up</span>
        </p>
      </div>
    </div>
  );
};
