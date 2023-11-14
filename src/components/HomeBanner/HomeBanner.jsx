import React from "react";
import "./homeBanner.scss";

export const HomeBanner = () => {
  return (
    <div className="homeBanner-container">
      <div className="homeBan-image">
        <img className="homeBanImage" src="homeImg.png" />
      </div>
      <div className="homeBanner-text">
        <span className="homeBan-heading">
          <span className="sp1">FUTURE OF</span> <span className="sp2">VOTING!</span>
        </span>
        <p className="homeBanner-para"> 
          Our website is your gateway to a cutting-edge,blockchain-based voting
          system that redefines transparency and credibility in elections. We're
          revolutionizing the way you cast your ballot, ensuring that every vote
          is secure, verifiable, and tamper-proof. Explore our platform to
          experience the future of democracy, where your voice counts more than
          ever. Join us in shaping a world where trust and transparency are at
          the core of every election. It's time to vote with confidence, powered
          by blockchain technology.
        </p>
      </div>
    </div>
  );
};
