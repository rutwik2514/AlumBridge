import React, { useState } from "react";
import { Link } from "react-router-dom";
// import LoginImg from "../Assets/login.svg"
import Hello from "../../Assets/Hello.json"
import Lottie from "lottie-react";
import "./Login.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Set's value of username as user inputs the data
  const usernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };
  //Set's valye of password as user inputs the data
  const passwordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };
  const handleLogin = (event) =>{
    axios.post("http://localhost:8000/api/v1/auth/login",{
      email: username,
      password: password
    }).then((res)=>{
        // console.log(res);
        localStorage.setItem("email",username);
        window.location.href="/dashboard";
    }).catch((err)=>{
      console.log(err);
      toast.error(`${err.response.data.msg}`)
      
    })
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
        <div className="col-md-6 p-4 text-light d-flex align-items-center justify-content-center loginmaindiv" style={{backgroundColor:"#f6f6f6"}}>
          <div className="col-md-7" style={{padding:'3vh'}}>
            <div className="col d-flex flex-column align-items-start logindiv" >
              <div className="mb-3">
                <h1 className="fw-bold" style={{color:'black'}}>Login</h1>
                <p style={{color:'black'}}>Get Started with your college alumni website</p>
              </div>
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Username
              </label>
              <input
                type="username"
                className="form-control my-1 w-75"
                id="username"
                placeholder="Eg. abc@xyz.com"
                onChange={usernameChange}
                value={username}
              />
              <label className="form-label my-1" style={{ fontSize: "1.3rem", color:'black' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control my-1 w-75"
                id="password"
                placeholder="Enter Password"
                onChange={passwordChange}
                value={password}
              />
              <div className="row w-100 justify-content-start mt-4 mb-3 mx-0">
                <div
                  className="btn my-1 p-2 rounded-pill"
                  style={{backgroundColor:'grey' ,color:'white',fontWeight:'bold',fontSize:'1.5rem',width:'11rem'}}
                  onClick={handleLogin}
                >
                  Login
                </div>
              </div>
              <p style={{color:'black'}}>Not Registered Yet? <Link to="/register" className="text-primary">Create an account</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6  p-4 animationDiv" style={{background: 'rgb(246,246,246)',
background: 'linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(255,253,253,1) 35%, rgba(198,198,198,1) 100%)', display:'flex', justifyContent:'center'}} >
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

export default Login;