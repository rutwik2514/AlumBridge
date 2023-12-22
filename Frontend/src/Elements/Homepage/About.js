import React from "react";
// import AboutBackground from "../Assets/about-background.png";
import AboutBackground from "../../Assets/about-background.png"

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" style={{height:'150vh'}}  />
      </div>
      <div className="about-section-image-container">
        {/* <img src={AboutBackgroundImage} alt="" /> */}
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading" style={{color:'grey'}}>About</p>
        <h1 className="primary-heading">
        "Graduated, celebrated, now elevated
        </h1>
        <p className="primary-text">
        Alumni form an essential bridge between the past and the future, offering invaluable insights, mentorship, and support, fostering a sense of community and contributing to institutional growth and success.
        </p>
        <p className="primary-text">
        </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
