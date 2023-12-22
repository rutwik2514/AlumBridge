import React from 'react'
import "./Homepage.css"
import Home from "../../Elements/Homepage/Home"
import About from "../../Elements/Homepage/About"
import Work from "../../Elements/Homepage/Work"
import Testimonial from "../../Elements/Homepage/Testimonial"
import Contact from "../../Elements/Homepage/Contact"
import Footer from "../../Elements/Homepage/Footer"

function Homepage() {
    return (
        <div className='homePage'>
            <Home />
            <About />
            <Work />
            <Testimonial />
            <Contact />
            <Footer />
        </div>
    )
}

export default Homepage