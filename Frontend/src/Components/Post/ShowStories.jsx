import React from 'react'
import Card from '../../Elements/Card/StoryCard';
import Navbar from '../../Elements/Navbar/Navbar';
import axios from 'axios';

function ShowStories() {
    const [stories,setStories] = React.useState();
    const [card,setCard]=React.useState();
    React.useEffect(()=>{
        axios.get("http://localhost:8000/api/v1/getStory", {
          }).then((res) => {
            setStories(res.data.stories);
          }).catch((err) => {
            console.log(err);
          })
       },[])
       React.useEffect(()=>{
        console.log("Stories ar", stories);
        if(stories){
            const cardRender = stories.map((element, index) => {
            return (
                <Card story = {element.story} author={element.author}/>
            );
          });
          setCard(cardRender);
        }
       },[stories])

       function handleClick(){
        window.location.href="/createStory"
       }
  return (
    <>
    <section style={{minHeight:'100vh', width:'100vw'}}>
        <Navbar />
        <div className='row' style={{minHeight:'90vh', width:'100vw', border:'solid black'}}>
            <div className='col-md-3 col-1' style={{}}>

            </div>
            <div className='col-md-6 col-10 p-3' style={{border:'solid black', borderTop:'none'}}>
                    {card}
                    <center><button onClick={handleClick} className='btn btn-secondary navbar-btn mx-3' style={{opacity:'0.5'}} >Post new Story</button></center>

            </div>
            <div className='col-md-3 col-1' style={{}}>

            </div>
        </div>

        </section>
    </>
  )
}

export default ShowStories