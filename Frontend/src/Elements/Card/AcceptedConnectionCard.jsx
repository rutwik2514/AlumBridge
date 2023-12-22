import React from 'react'
import axios from 'axios';
function AcceptedConnectionCard(props) {
    const [profile,setProfile]=React.useState();
    const [displayProfile,setDispProfile]=React.useState();
    const [show,setShow]=React.useState(false);
    // console.log("came tp accepted");
    React.useEffect(()=>{
        // console.log("camamamamamamamamamama", props.email);
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
  return (
    <>
    {show && <div className="card m-2">
                <div className="card-header">
                    <h5>{displayProfile.name}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">Bio: {displayProfile.bio}</p>
                    <p className="card-text">Number of Connections: {displayProfile.numberOfConnections}</p>
                </div>
            </div>}
            {/* <h1>hi</h1> */}
    </>
  )
}

export default AcceptedConnectionCard