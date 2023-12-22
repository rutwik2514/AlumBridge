import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar'
import profileImg from "../../Assets/profile.png"
import "./Dashboard.css"
import axios from "axios";
import Lottie from "lottie-react";
import Robot from "../../Assets/dashboard_robot.json"
import ConnectionCard from '../../Elements/Card/ConnectionCard';
import AcceptedConnectionCard from '../../Elements/Card/AcceptedConnectionCard';
function Dashboard() {
  const [data, setData] = React.useState({
    name: "",
    bio: "",
    numberOfConnections: "",
    recentPosts: "",
    recentConnections: "",
  })
  const [connectionRequests, setConnectionRequests] = React.useState();
  const [renderConnections,setRenderConnections]=React.useState();
  const [acceptedConnections,setAcceptedConnections]=React.useState();
  const [renderAcceptedConnections,setRenderAcceptedConnections]=React.useState();
  const [connectionCount,setConnectionCount]=React.useState();
  const findRecentConnections = (e) => {
    let current_email = localStorage.getItem("email");
     axios.post("http://localhost:8000/api/v1/getRecentConnections",{
      to:current_email
     }).then((res) =>{
      // console.log("onnections are", res);
        setConnectionRequests(res.data.connectionRequests);
        console.log(connectionRequests);
     }).catch((err)=>{
      window.alert(err);
     })
     
     
  }
  const findAcceptedConnections = (e) =>{
    let current_email = localStorage.getItem("email");

     axios.post("http://localhost:8000/api/v1/getAccepted",{
      to:current_email
     }).then((res) =>{
      // console.log("onnections are", res);
        // setConnectionRequests(res.data.connectionRequests);
        // console.log(connectionRequests);
        console.log(res.data.Accepted);
        setAcceptedConnections(res.data.Accepted);
     }).catch((err)=>{
      window.alert(err);
     })
  }
  React.useEffect(()=>{

    if(connectionRequests ){
      const cardRender = connectionRequests.map((element, index) => {
        if(index > 0  && connectionRequests[index].isConnected != true){
        return (
          index &&
            <div>
              {/* {element.connectionEmailFrom}
               */}
               <ConnectionCard email = {connectionRequests[index].connectionEmailFrom}  />
            </div>
        );
        }
      });
      setRenderConnections(cardRender)
    }
  }, [connectionRequests])
  React.useEffect(()=>{
    if(acceptedConnections){
      setConnectionCount(acceptedConnections.length)
      console.log("sending");
      const cardRender = acceptedConnections.map((element, index) => {
        if(index >0){
          console.log("mail is", acceptedConnections[index].connectionEmail);
        return (
            <div>
               <AcceptedConnectionCard email = {acceptedConnections[index].connectionEmail}  />
            </div>
        );
        }
      });
      setRenderAcceptedConnections(cardRender)
    }
  },[acceptedConnections])
  React.useEffect(() => {
    let current_email = localStorage.getItem("email");
    if (!current_email) {
      window.location.href = "/login";
    }
    else {
      console.log("posting", current_email);
      axios.post("http://localhost:8000/api/v1/getProfile", {
        "email": current_email,
      }).then((res) => {
        // console.log(res.data.profile[0]);
        let profile = res.data.profile[0];
        data.name = profile.name;
        data.bio = profile.bio;
        data.recentConnections = profile.recentConnections;
        data.numberOfConnections = profile.numberOfConnections;
        data.recentPosts = profile.recentPosts;
        // setFinalData(data);
        findRecentConnections();
        findAcceptedConnections();

      }).catch((err) => {
        console.log(err);
      })
    }
  }, [])
  React.useEffect(() => {
    console.log("hi", data.name);
  }, [data])
  const handleClickPost = (event) => {
    window.location.href = "/createPost"
  }
  const handleClickConnection = (event) =>{
    window.location.href="/search"
  }
  const handleStoryPost = (event) =>{
    window.location.href="/createStory"
  }
  return (
    <>
      <Navbar />
      <section style={{ width: '100vw', minHeight: '90vh',  }} className='row'>
        <div className='col-md-2 col-1' >
        </div>
        <div className='col-md-8 col-10' style={{ border: "solid black" }}>
          <div className='row p-3' style={{ height:'25vh' }} id='helloDiv'>
            <div className='col-md-3 ' id='imgWrap' >
              <img src={profileImg} alt='ProfileIMG' style={{ borderRadius: '50%', height: '', width: '10vw' }} id='profileImage' />
            </div>
            <div className='col-md-5'  style={{ display: 'flex', alignItems: 'center' }}>
              <h1>Hello {data.name}</h1>
            </div>
          </div>
          <div className='row p-4' style={{ minHeight: '10vh', borderTop: "solid black" }}>
            {data.bio}
          </div>
          <div className='row p-0' style={{ minHeight: '10vh', borderTop: "solid black", borderBottom: "solid black" }}>
            <div className='col-md-6 p-4' id='noOfConnections' style={{ borderRight: 'solid black' }} >Number of Connections: {connectionCount - 1}</div>
            <div className='col-md-6 p-4' >Send Connection Requests: <button className='btn btn-secondary navbar-btn mx-3' onClick={handleClickConnection} style={{opacity:'0.5'}}>Search
            </button></div>
          </div>
          <div className='row p-0' style={{ minHeight: '10vh', borderBottom: "solid black" }}>
            <div className='col-md-6 p-4' id='noOfConnections' style={{ borderRight: 'solid black' }} >Post Job Opening: <button className='btn btn-secondary navbar-btn mx-3' style={{opacity:'0.5'}} onClick={handleClickPost} >Post</button></div>
            <div className='col-md-6 p-4' >Post news/stories: <button className='btn btn-secondary navbar-btn mx-3' style={{opacity:'0.5'}} onClick={handleStoryPost}>Post</button></div>
          </div>
          <div className='row p-4' style={{borderBottom:'solid black'}}>
            <p>Pending Connection Requests : </p> {renderConnections}
          </div>
          <div className='row p-4' style={{borderBottom:'solid black'}}>
            <p>Connections : </p> {renderAcceptedConnections}
          </div>
        </div>
        <div className='col-md-2 col-1'>
        </div>

      </section>
    </>
  )
}

export default Dashboard