import axios from 'axios'
import React from 'react'

function ConnectionCard(props) {
    const [profile,setProfile]=React.useState();
    const [displayProfile,setDispProfile]=React.useState();
    const [show,setShow]=React.useState(false);
    React.useEffect(()=>{
        // console.log("camefafasmfnafnjanfa", props.email);
        axios.post("http://localhost:8000/api/v1/getProfile",{email:props.email})
        .then((res)=>{
            setProfile(res.data.profile)
        })
    },[])
    React.useEffect(()=>{
        if(profile){
            setDispProfile(profile[0]);
        }
        
    },[profile])
    React.useEffect(()=>{
        if(displayProfile){
            setShow(true);
        }
    },[displayProfile])
    const handleAcceptRequest = (e) =>{
        const curr_email = localStorage.getItem("email");
        console.log("came to accept");
        console.log("sending to accept", curr_email);
        console.log("to", props.email);
        
        axios.post("http://localhost:8000/api/v1/acceptConnectionRequest",{from: props.email, to:curr_email})
        .then((res)=>{
            window.alert("Connection Request Accepted");
            setShow(false);
        }).catch((err)=>{
            window.alert(err);
        })
    }
    return (
        <>
           {show && <div className="card m-2">
                <div className="card-header">
                    <h5>{displayProfile.name}</h5>
                </div>
                <div className="card-body">
                    <p class="card-text">Bio: {displayProfile.bio}</p>
                    <p class="card-text">Number of Connections: {displayProfile.numberOfConnections}</p>
                    <button class="btn btn-success" onClick={handleAcceptRequest}>Accept Request</button>
                </div>
            </div>}
        </>
    )
}

export default ConnectionCard