import React from "react";
import "./signup.scss"
import { Link } from "react-router-dom";
export const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Last Name</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Age</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Password</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Gender</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Email</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Aadhaar Number</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Upload your image</h3>
          <input type="text" className="signup-inputs" />
          <h3 className="signup-label">Voter Constituency</h3>
          <input type="text" className="signup-inputs" />
        </div>
        <div className="signup-forgotPass">
          {" "}
          <button className="signup-btn" >Sign In</button>
        </div>
        <p className="signUp">
          Already registered? <span className="signup-Link"><Link className="link" to={"/login"}>Login</Link></span>
        </p>
      </div>
    </div>
  );
};
