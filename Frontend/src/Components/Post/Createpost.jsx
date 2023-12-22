import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar'
import profileImg from "../../Assets/profile.png"
import axios from 'axios'
import "./Createpost.css"
function Createpost() {
    const data = {
        companyName:"",
        batchEligible:"",
        title:"",
        applyLink:"",
        from:"",
    }
    const handleChangeName = (event) =>{
        data.companyName=event.target.value;
    }
    const handleChangeTitle = (event) =>{
        data.title=event.target.value;
    }
    const handleChangeApplyLink = (event) =>{
        data.applyLink=event.target.value;
    }
    const handleChangeBatch = (event) =>{
        data.batchEligible=event.target.value;
    }
    const handleClick = (event) =>{
        console.log("sending", data);
        const user = localStorage.getItem("email")
        data.from=user;
        axios.post("http://localhost:8000/api/v1/createCompany",{
            data
          }).then((res)=>{
              console.log(res);
              window.location.href="/opportunities"
          }).catch((err)=>{
            console.log(err);
          })
    }
  return (
    <>
    <Navbar />
      <section style={{ width: '100vw', height: '90vh',}} className='row'>
        <div className='col-md-2 col-1' >
        </div>
        <div className='col-md-7 col-10' style={{ border:"solid black"  }}>
          <div className='row p-3' style={{ height: '25vh',}}>
            {/* <div className='col-md-3 profileImgDiv' >
              <img src={profileImg} alt='ProfileIMG' style={{ borderRadius: '50%', height:'10vh' }} class='profileImg' />
            </div> */}
            <div className='col-md-9' style={{ display: 'flex', alignItems: 'center' }}>
              <h1>For creating post, enter following details</h1>
            </div>
          </div>
          <div className='row p-3' style={{ minHeight: '10vh',  borderTop:"solid black" }}>
                <input placeholder='Enter Company Name' onChange={handleChangeName} />
          </div>
          <div className='row p-3' style={{ minHeight: '10vh',  borderTop:"solid black" }}>
                <input placeholder='Enter Position Description' onChange={handleChangeTitle} />
          </div>
          <div className='row p-3' style={{ minHeight: '10vh',  borderTop:"solid black" }}>
                <input placeholder='Enter Batches Eligible' onChange={handleChangeBatch}/>
          </div>
          <div className='row p-3' style={{ minHeight: '10vh',  borderTop:"solid black" }}>
                <input placeholder='Enter Link to apply' onChange={handleChangeApplyLink} />
          </div>
          <div className='row p-3' style={{ minHeight: '10vh',  borderTop:"solid black" }}>
                <button onClick={handleClick}>Submit</button>
          </div>
          
        </div>
        <div className='col-md-3 col-1'>
        </div>
      </section>
      </>
  )
}

export default Createpost