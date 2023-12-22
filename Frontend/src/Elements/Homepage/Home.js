import React from "react";
// import BannerBackground from "../Assets/home-banner-background.png";
// import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "../Navbar/Navbar_loggedout";
import { FiArrowRight } from "react-icons/fi";
// import Lottie from "lottie-react";
import graduationCap from "../../Assets/graduation_cap.png"
const Home = () => {
  function handleSignUpClick(){
    window.location.href="/login"
  }
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          {/* <img src={BannerBackground} alt="" style={{height:'90vh'}} /> */}
        <img src={graduationCap} alt="" style={{height:'70vh'}} />

        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Connect with Alumni
          </h1>
         
          <p className="primary-text">
            Best platform to connect with your college alumnis
          </p>
          <button className="secondary-button" onClick={handleSignUpClick}>
            Sign Up now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
        {/* <img src={graduationCap} alt="" style={{height:'50vh'}} /> */}
         
        </div>
      </div>
    </div>
  );
};

export default Home;
