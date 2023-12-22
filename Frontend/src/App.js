import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.js";
import Dashboard from './Components/Dashboard/Dashboard';
import Opportunities from './Components/Opportunities/Opportunities';
// import Createprofile from './Components/CreateProfile/Createprofile'
import Createprofile from './Components/CreateProfile/Createprofile';
import Createpost from './Components/Post/Createpost';
import Memories from './Components/Memories/Memories';
import Search from './Components/Search/Search';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import CreateStory from './Components/Post/CreateStory';
import ShowStories from './Components/Post/ShowStories';
import "@fontsource/reem-kufi"; // Defaults to weight 400
import "@fontsource/reem-kufi/400.css"; // Specify weight
import "./App.css"
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/opportunities" element={<Opportunities />} />
          <Route exact path="/createProfile" element={<Createprofile />} />
          <Route exact path="/createPost" element={<Createpost />} />
          <Route exact path="/memory" element={<Memories />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/viewProfile" element={<ViewProfile />} />
          <Route exact path="/createStory" element={<CreateStory />} />
          <Route exact path="/showStory" element={<ShowStories />} />







          

        </Routes>
      </BrowserRouter>
  )
}

export default App