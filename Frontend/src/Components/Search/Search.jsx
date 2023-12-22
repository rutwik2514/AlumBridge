import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar'
import axios from 'axios';
import CardProfile from '../../Elements/Card/CardProfile';
import "./Search.css"
function Search() {
  const [searchInput, setSearchIntput] = React.useState();
  const [foundProfile, setFoundProfile] = React.useState();
  const [profiles, setProfiles] = React.useState();
  const handleInputChange = (event) => {
    setSearchIntput(event.target.value);
  }
  const handleSearchClick = (event) => {
    const name = searchInput;
    axios.post("http://localhost:8000/api/v1/findProfile", {
      name
    }).then((res) => {
      console.log("found");
      console.log(res.data.profile[0]);
      setFoundProfile(res.data.profile);
    }).catch((err) => {
      console.log(err);
    })
  }
  React.useEffect(() => {
    if (foundProfile) {
      const profileRender = foundProfile.map((element, index) => {
        return (
          <CardProfile name={element.name} bio={element.bio} applyLink={element.numberOfPosts} posts={element.numberOfConnections} email={element.email} />
        );
      });
      setProfiles(profileRender);
    }
  }, [foundProfile])
  return (
    <>
      <Navbar />
      <section className='row p-0' style={{ minHeight: '90vh', width: '100vw' }}>
        <div className='col-md-2 col-1'></div>
        <div className='col-md-8 p-0 col-10' style={{ border: 'solid black' }}>
          <div className='d-flex justify-content-center align-items-center search-div' style={{ height: '15vh', borderBottom: 'solid black' }}>
            <input type="text" className='mx-3 input-div' placeholder="Enter Name of Alumni" style={{ height: '10vh', width: '80vh', padding: '1rem' }} onChange={handleInputChange} />
            {/* <input placeholder='Enter Link to apply' onChange={handleInputChange} /> */}
            <div className='row'>
              <button className='btn-div' style={{ height: '10vh', width: '15vw' }} onClick={handleSearchClick}>Search</button>
            </div>
          </div>
          {profiles}
        </div>

        <div className='col-md-2 col-1 m-0 p-0'></div>

      </section>
    </>
  )
}

export default Search