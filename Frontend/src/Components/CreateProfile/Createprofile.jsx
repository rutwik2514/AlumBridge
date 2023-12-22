import React from 'react'
import axios from "axios"
import Hello from "../../Assets/Hello.json"
import Lottie from "lottie-react";
function Createprofile() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword,setConfirmPassword]= React.useState("");
    const data = {
        email:"",
        name:"",
        bio:"",
        numberOfConnections: 0,
        recentPosts : "",
        recentConnections:""

    }
  
    //Set's value of username as user inputs the data
    const emailChange = (event) => {
     data.email=event.target.value;
    };
    //Set's valye of password as user inputs the data
    const nameChange = (event) => {
      data.name=event.target.value;
    };
    const bioChange = (event) =>{
      data.bio=event.target.value;
    }
    const handleClick = (event) =>{
        console.log(data);
      axios.post("http://localhost:8000/api/v1/makeProfile",{
        data
      }).then((res)=>{
          console.log(res);
          window.location.href="/login"
      }).catch((err)=>{
        console.log(err);
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
          <div className="col-md-6 p-4 text-light d-flex align-items-center justify-content-center loginmaindiv" style={{backgroundColor:"#040C18"}}>
            <div className="col-md-7">
              <div className="col d-flex flex-column align-items-start logindiv">
                <div className="mb-3">
                  <h1 className="fw-bold">CreateProfile</h1>
                  <p>Get Started with your college alumni website</p>
                </div>
                <label className="form-label my-1" style={{ fontSize: "1.3rem" }}>
                  Reenter your email
                </label>
                <input
                  type="username"
                  className="form-control my-1 w-75"
                  id="username"
                //   placeholder="Eg. abc@xyz.com"
                  onChange={emailChange}
                //   value={username}
                />
                <label className="form-label my-1" style={{ fontSize: "1.3rem" }}>
                  Enter your Profile Name
                </label>
                <input
                  type="string"
                  className="form-control my-1 w-75"
                  id="password"
                //   placeholder="Set A Password"
                  onChange={nameChange}
                //   value={password}
                />
                <label className="form-label my-1" style={{ fontSize: "1.3rem" }}>
                  Enter your Profile Bio
                </label>
                <input
                //   type="password"
                  className="form-control my-1 w-75"
                  id="password"
                //   placeholder="Set A Password"
                  onChange={bioChange}
                  // value={password}
                />
                <div className="row w-100 justify-content-start mt-4 mb-3 mx-0">
                  <div
                    className="btn my-1 p-2 rounded-pill"
                    onClick={handleClick}
                    style={{backgroundColor:'#F49867' ,color:'black',fontWeight:'bold',fontSize:'1.5rem',width:'11rem'}}
                  >
                    Register
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6  p-4 animationDiv" style={{background:'linear-gradient(89.97deg, #040c18 1.84%, #F49867 102.67%)', display:'flex', justifyContent:'center'}} >
               <Lottie animationData={Hello} style={{height:'80vh'}}/>
          </div>
        </section>
      </>
    );
}

export default Createprofile