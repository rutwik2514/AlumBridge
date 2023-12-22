import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar'
import IMG1 from "../../Assets/IMG1.jpg"
import IMG2 from "../../Assets/IMG2.jpg"
import IMG3 from "../../Assets/IMG3.jpg"
import IMG4 from "../../Assets/IMG4.jpg"
import IMG5 from "../../Assets/IMG5.jpg"
import IMG7 from "../../Assets/IMG7.jpg"
import IMG8 from "../../Assets/IMG8.jpg"
import IMG9 from "../../Assets/IMG9.jpg"

function Memories() {
  return (
    <>
    <Navbar />
    <section style={{minHeight:'90vh', width:'100vw'}} className='row justify-content-center align-items-center'>
        <div className='col-md-2' style={{}}></div>
        <div className='col-md-8' style={{ minHeight:'90vh', border:'solid black'}}>
            <div className='row d-flex justify-content-center align-items-center' style={{minHeight:'10vh', fontSize:'larger', fontWeight:'bold', borderBottom:'solid black'}}>Memories</div>
            <div className='row d-flex justify-content-center align-items-center p-3' style={{minHeight:'40vh', borderBottom:'solid black'}}>
                <img src={IMG4} style={{height:'50vh'}} />
            </div>
            <div className='row d-flex justify-content-center align-items-center p-3' style={{minHeight:'40vh', borderBottom:'solid black'}}>
                <img src={IMG5} style={{height:'50vh'}} />
            </div>
            <div className='row d-flex justify-content-center align-items-center p-3' style={{minHeight:'40vh', borderBottom:'solid black'}}>
                <img src={IMG7} style={{height:'50vh'}} />
            </div>
            <div className='row d-flex justify-content-center align-items-center p-3' style={{minHeight:'40vh', borderBottom:'solid black'}}>
                <img src={IMG8} style={{height:'50vh'}} />
            </div>
            <div className='row d-flex justify-content-center align-items-center p-3' style={{minHeight:'40vh', borderBottom:'solid black'}}>
                <img src={IMG9} style={{height:'50vh'}} />
            </div>

        </div>
        <div className='col-md-2' style={{}}></div>


    </section>
    </>
  )
}

export default Memories