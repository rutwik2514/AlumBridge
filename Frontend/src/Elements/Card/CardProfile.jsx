import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function CardProfile(props) {
    const [sent, setSent]=React.useState(false);
    const handleClick = (event) =>{
        const to = event.target.name;
        const from = localStorage.getItem("email");
        console.log("to", to);
        console.log("from", from);
        axios.post("http://localhost:8000/api/v1/sendConnectionRequest",{
        to:to,
        from:from
    }).then((res)=>{
        window.alert("Connection request sent");
        setSent(true);

    }).catch((err)=>{
      toast.error("Request Already Sent or Connected Already");
    })

    }
    const handleViewClick = (event) =>{
      localStorage.setItem("viewemail", event.target.name);
      window.location.href="/viewProfile"
    }
  return (
    
    <>
    <div className="card m-2" >
                <div className="card-body">
                    <h5 className="card-title">Name : {props.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted"> Bio: {props.bio}</h6>
                    <p className="card-text">Number of Connecitons: {props.posts}</p>
                    {!sent &&<button style={{padding:'0.5rem'}} name={props.email} onClick={handleClick}>Send Connection Request</button>}
                    <button className='mx-2 p-2' onClick={handleViewClick} name={props.email}>View Profile</button>
                    {sent && <p>Connection Request Sent</p>}

                    {/* <a href={props.applyLink} class="card-link">Send Connection Request</a> */}
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
    </div>
    </>
  )
}

export default CardProfile