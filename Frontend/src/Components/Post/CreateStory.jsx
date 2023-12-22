import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar';
import axios from 'axios';
import profileImg from "../../Assets/profile.png"

function CreateStory() {
    const data = {
        story: "",
        from: "",
    }
    data.from = localStorage.getItem("email");
    const handleTextChange = (event) => {
        data.story = event.target.value;
    }
    const handleClick = (event) => {
        axios.post("http://localhost:8000/api/v1/createStory", {
            data
        }).then((res) => {
            console.log(res);
            window.location.href = "/showStory"

        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <>
            <Navbar />
            <section style={{ width: '100vw', height: '90vh', }} className='row'>
                <div className='col-md-2 col-1' >
                </div>
                <div className='col-md-7 col-10' style={{ border: "solid black" }}>
                    <div className='row p-3' style={{ height: '25vh', borderBottom: 'solid black' }}>
                        
                        <div className='col-md-9' style={{ display: 'flex', alignItems: 'center' }}>
                            <h1>For creating post, enter following details</h1>
                        </div>
                    </div>
                    <div>
                        <div className='row p-3' style={{ minHeight: '10vh', borderTop: "solid black" }}>
                            <input placeholder='Enter news or story' onChange={handleTextChange} />
                        </div>

                        <div className='row p-3' style={{ minHeight: '10vh', borderTop: "solid black" }}>
                            <button onClick={handleClick}>Post</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-1'>
                </div>
            </section>

        </>
    )
}

export default CreateStory