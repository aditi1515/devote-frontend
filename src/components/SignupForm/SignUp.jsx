import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../config/data";
import { login } from "../../config/userReducer";
import "./signup.scss";
export const SignUp = () => {

  const [formdata, setFormData] = useState({ houseaddress: "30 Wellington Square" })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value })
  }

  async function handleSignIn() {
    console.log(formdata);
    try {
      const response = await axios.post(
        `${URL}/user/signup`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response?.data);
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
    finally {
    }


  }

  return (
    <div className="signup-main-container">
      <div className="signup-imageContainer">
        <img className="signup-image" src="loginImg.png" />
      </div>
      <div className="signup-form">
        <h2 className="signup-heading">SIGN UP</h2>
        <div className="signup-fields">
          {" "}
          <h3 className="signup-label">First Name</h3>
          <input type="text" onChange={handleChange} id="firstname" className="signup-inputs" />
          <h3 className="signup-label">Last Name</h3>
          <input type="text" onChange={handleChange} id="lastname" className="signup-inputs" />
          <h3 className="signup-label">Age</h3>
          <input type="text" onChange={handleChange} id="age" className="signup-inputs" />
          <h3 className="signup-label">Password</h3>
          <input type="password" onChange={handleChange} id="password" className="signup-inputs" />
          <h3 className="signup-label">Gender</h3>
          <input type="text" onChange={handleChange} id="gender" className="signup-inputs" />
          <h3 className="signup-label">Email</h3>
          <input type="text" onChange={handleChange} id="email" className="signup-inputs" />
          <h3 className="signup-label">Aadhaar Number</h3>
          <input type="text" onChange={handleChange} id="aadhaarNumber" className="signup-inputs" />
          <h3 className="signup-label">Upload your image</h3>
          <input type="text" onChange={handleChange} id="imageUrl" className="signup-inputs" />
          <h3 className="signup-label">Voter Constituency</h3>
          <input type="text" onChange={handleChange} id="voterConstituency" className="signup-inputs" />
        </div>
        <div className="signup-forgotPass">
          {" "}
          <button className="signup-btn" onClick={handleSignIn}>Sign In</button>
        </div>
        <p className="signUp">
          Already registered? <span className="signup-Link"><Link className="link" to={"/login"}>Login</Link></span>
        </p>
      </div>
    </div>
  );
};
