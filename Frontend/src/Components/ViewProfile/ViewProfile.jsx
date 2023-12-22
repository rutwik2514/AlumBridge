import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar'
import profileImg from "../../Assets/User.svg"
import profileImg2 from "../../Assets/profile.png"
import axios from "axios";
import Lottie from "lottie-react";
import Robot from "../../Assets/dashboard_robot.json"
function ViewProfile() {
  const [data,setData]=React.useState({
    name:"",
    bio:"",
    numberOfConnections:"",
    recentPosts:"",
    recentConnections:"",
    whatsappNumber:"",
    email:"",
  })
  const [show,setShow]=React.useState();
  const [finalData,setFinalData]=React.useState();
  React.useEffect( () => {
    let current_email = localStorage.getItem("viewemail");
    // console.log(email);
    if (!current_email) {
      window.location.href = "/login";
    }
    else {
      console.log("posting", current_email);
      axios.post("http://localhost:8000/api/v1/getProfile", {
        "email":current_email,
      }).then((res) => {
        console.log(res.data.profile[0]);
        let profile=res.data.profile[0];
        data.name=profile.name;
        data.bio=profile.bio;
        data.recentConnections=profile.recentConnections;
        data.numberOfConnections=profile.numberOfConnections;
        data.recentPosts=profile.recentPosts;
        data.email=profile.email;
        data.whatsappNumber=profile.whatsappNumber;
        setFinalData(data);
        console.log(data.name);
      }).catch((err) => {
        console.log(err);
      })
      // try{
        const from = localStorage.getItem("email");
        const to = localStorage.getItem("viewemail")
        axios.post("http://localhost:8000/api/v1/isConnected", {to:to, from:from}).then((res)=>{
          // window.alert(res.data);
          console.log("returni", res.status);
          if(res.status==200){
            // window.alert("you can view");
            setShow(true);
          }
          else{
            // window.alert("You cant");
          }
        }).catch((err)=>{
          // window.alert("cant", err);
        })
      // }
    }
  }, [])
  const handleBack = (event) =>{
    localStorage.removeItem("viewemail");
    window.location.href="/search"
  }
  React.useEffect(()=>{
    console.log("hi",data.name);
  },[data])
  const handleClickPost = (event) =>{
    window.location.href="/createPost"
  }
  return (
    <>
      <Navbar />
      <section style={{ width: '100vw', height: '90vh',}} className='row'>
        <div className='col-2' >
        </div>
        <div className='col-7' style={{ border:"solid black"  }}>
          <div className='row p-3' style={{ height: '25vh',}}>
            <div className='col-md-3 ' id='imgWrap' >
              {!show && <img src={profileImg} alt='ProfileIMG' style={{ borderRadius: '50%', height:'10vh', width:'10vw' }} id='profileImage' />}
              {show && <img src={profileImg2} alt='ProfileIMG' style={{ borderRadius: '50%', height:'10vh', width:'10vw' }} id='profileImage' />}
            </div>
            <div className='col-md-5 p-4' style={{ display: 'flex', alignItems: 'center', flexDirection:'column', justifyContent:'center' }}>
              <h1>Hello {data.name}</h1>
            </div>
            <div className='col-md-4' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <button onClick={handleBack} style={{height:'5vh', opacity:'0.5'}} className='btn btn-secondary navbar-btn'>Go Back</button>

            </div>
          </div>
          <div className='row p-4' style={{ minHeight: '10vh',  borderTop:"solid black" }}>
            {data.bio}
          </div>
          <div className='row p-0' style={{ minHeight: '10vh',borderTop:"solid black", borderBottom:"solid black"  }}>
            <div className='col-md-6 p-4' style={{borderRight: 'solid black'}} >Number of Connections: {data.numberOfConnections}</div>
            <div className='col-md-6 p-4' >Create Post: <button onClick={handleClickPost} className='btn btn-secondary' style={{opacity:'0.5'}}>Post</button></div>
          </div>
          {!show && <div className='row p-4'>
              Recent Connections
          </div>}
          {show &&<>
          <div className='row p-4'>
             whatsappNumber:{data.whatsappNumber}
          </div>
          <div className='row p-4'>
              email:{data.email};
          </div></>}

        </div>
        <div className='col-3'>
        </div>

      </section>
    </>
  )
}

export default ViewProfile  