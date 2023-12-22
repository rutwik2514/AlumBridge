import React, { useState } from "react";
import { Link } from "react-router-dom";
// import LoginImg from "../Assets/login.svg"
import Hello from "../../Assets/Hello.json"
import Lottie from "lottie-react";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";
// import "./Login.css"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]= useState("");
  const data = {
    email:email,
    name:"",
    bio:"",
    whatsappNumber: "",
    numberOfConnections: 0,
    recentOpenings:[{}],
    recentStories:[{}],
    connectionRequests:[{}],
    sentConnectionRequests:[{}],
    recentConnections:[{}]
}
  //Set's value of username as user inputs the data
  const usernameChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };
  //Set's valye of password as user inputs the data
  const passwordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };
  const confirmPasswordChange = (event) =>{
    const {value} = event.target;
    setConfirmPassword(value);
    console.log(confirmPassword);
  }
  const handleChangeBio = (e) =>{
    data.bio = e.target.value;
  }
  const handleChangeName = (event) =>{
    data.name=event.target.value;
  }
  const handleChangewhatsappNumber = (e) =>{
    data.whatsappNumber=e.target.value;
  }
  const createProfile = async(req,res)=>{
    data.email = email;
    console.log("caemememe", data);
    console.log("came");
    axios.post("http://localhost:8000/api/v1/makeProfile",{
        data
      }).then((res)=>{
          console.log(res);
          window.location.href="/login"
      }).catch((err)=>{
        console.log(err);
        toast.error("Something went wrong, Please Try again")
      })
  }
  const handleRegister = (event) =>{
    axios.post("http://localhost:8000/api/v1/auth/register",{
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }).then((res)=>{
        console.log(res);
        // window.location.href="/createProfile"
        createProfile();
    }).catch((err)=>{
      console.log(err);
      toast.error(err.response.data.msg)
    })
    // createProfile();
  }
  return (
    <>
      <section
        className="justify-content-start row m-0"
        style={{
          height: "100vh",
          width: "100%",
          background: "rgb(34, 33, 35)",
        }}
      >
        <div className="col-md-6 p-4 text-light d-flex align-items-center justify-content-center loginmaindiv" style={{backgroundColor:"rgb(246,246,246)"}}>
          <div className="col-md-7">
            <div className="col d-flex flex-column align-items-start logindiv">
              <div className="mb-3">
                <h1 className="fw-bold" style={{color:'black'}}>Register</h1>
                <p style={{color:'black'}}>Get Started with your college alumni website</p>
              </div>
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Email
              </label>
              <input
                type="username"
                className="form-control my-1 w-75"
                id="username"
                placeholder="Eg. abc@xyz.com"
                onChange={usernameChange}
                value={email}
              />
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control my-1 w-75"
                placeholder="Set A Password"
                onChange={passwordChange}
                value={password}
              />
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control my-1 w-75"
               
                placeholder="Set A Password"
                onChange={confirmPasswordChange}
                // value={password}
              />
                <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Name:
              </label>
              <input
                type="text"
                className="form-control my-1 w-75"
                placeholder="Please Enter your name"
                name="name"
                onChange={handleChangeName}
              />
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Whatsapp Number:
              </label>
              <input
                type="number"
                className="form-control my-1 w-75"
            
                name="whatsappNumber"
                placeholder="Enter your whatsapp Number"
                onChange={handleChangewhatsappNumber}
                // value={password}
              />
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Bio:
              </label>
              <input
                type="text"
                className="form-control my-1 w-75"
                placeholder="Enter your bio or achivements"
                name="bio"
                onChange={handleChangeBio}
                // value={password}
              />
              <div className="row w-100 justify-content-start mt-4 mb-3 mx-0">
                <div
                  className="btn my-1 p-2 rounded-pill"
                  onClick={handleRegister}
                  style={{backgroundColor:'grey' ,color:'black',fontWeight:'bold',fontSize:'1.5rem',width:'11rem'}}
                >
                  Register
                </div>
              </div>
              <p style={{color:'black'}}>Already Have an account?<Link to="/login" className="text-primary">Login</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6  p-4 animationDiv" style={{background: 'rgb(246,246,246)',
background: 'linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(255,253,253,1) 35%, rgba(198,198,198,1) 100%)', display:'flex', justifyContent:'center', minHeight:'120vh'}} >
             <Lottie animationData={Hello} style={{height:'80vh'}}/>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </>
  );
}

export default Register;