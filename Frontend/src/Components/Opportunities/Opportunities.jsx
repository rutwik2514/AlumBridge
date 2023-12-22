import React from 'react'
import Navbar from '../../Elements/Navbar/Navbar'
import axios from "axios";
import Card from '../../Elements/Card/Card';
function Opportunities() {
    const [companies,setCompanies]=React.useState();
    const [card,setCard]=React.useState();
   React.useEffect(()=>{
    axios.post("http://localhost:8000/api/v1/getCompany", {
      }).then((res) => {
        console.log(res.data.companies);
        setCompanies(res.data.companies);
      }).catch((err) => {
        console.log(err);
      })
   },[])

   React.useEffect(()=>{
    if(companies){
        const cardRender = companies.map((element, index) => {
        return (
            <Card title={element.title} companyName={element.companyName} applyLink={element.applyLink} batchEligible={element.batchEligible} />
        );
      });
      setCard(cardRender);
    }
   },[companies])
   React.useEffect(()=>{
    console.log(card);
   },[card]);
   function handleClick(){
    window.location.href="/createPost"
   }
  return (
    <>
        <section style={{minHeight:'100vh', width:'100vw'}}>
        <Navbar />
        <div className='row m-0' style={{minHeight:'90vh', width:'100vw', border:'solid black'}}>
            <div className='col-md-3 col-1' style={{}}>

            </div>
            <div className='col-md-6 col-10 p-3' style={{border:'solid black', borderTop:'none', justifyContent:'center', alignItems:'center'}}>
                    {card}
                    <center><button onClick={handleClick} className='btn btn-secondary navbar-btn mx-3' style={{opacity:'0.5'}} >Post new Job Opening</button></center>
            </div>
            <div className='col-md-3 col-1' style={{}}>

            </div>
        </div>

        </section>

    </>
  )
}

export default Opportunities