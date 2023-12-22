import React from 'react'
import IIITS_LOGO from "../../Assets/IIITS_LOGO.png"
import { useWindowSize } from "usehooks-ts";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./Navbar.css"
function Navbar() {
  const [showButtons, setShowButtons] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const { width } = useWindowSize();
  const [openMenu, setOpenMenu] = React.useState(false);

  const menuOptions = [
    {
      text: "Dashboard",
      name:"dashboard"
    },
    {
      text: "Opportunities",
      name : "opportunities"
    },
    {
      text: "News/Stories",
      name : "showStory",
    },
    {
      text: "Search",
      name:"search"
    },
    {
      text: "Memories",
      name:"memory"
    },
  ];

  React.useEffect(() => {
    if (width <= 1000) {
      setShowButtons(false)
    }
    if (width > 1000) {
      setShowButtons(true);
    }
  }, [width]);
  const handleClick = (event) => {
    // console.log(event.target)
    window.location.href = `/${event.target.name}`;
  }
  return (
    <>
      <section style={{ width: '100vw', height: '10vh', padding: '2vh', marginBottom: '5vh', marginTop: '3vh' }} className='d-flex justify-content-between align-items-center'>
        <div>
          <img src={IIITS_LOGO} alt="IIITSURAT" style={{ height: '10vh', padding: '0' }} id='IIIT_LOGO_NAVBAR' />
        </div>
        {showButtons && <div className='d-flex justify-content-between' style={{ width: '95vh' }}>
          {/* <button type="button" >Primary</button> */}
          <button onClick={handleClick} style={{ opacity: '0.8' }} class="btn btn-secondary navbar-btn" name='opportunities'>Opporunities</button>
          <button onClick={handleClick} style={{ opacity: '0.8' }} class="btn btn-secondary navbar-btn" name='showStory'>News/Stories</button>
          <button onClick={handleClick} style={{ opacity: '0.8' }} class="btn btn-secondary navbar-btn" name='dashboard'>Dashboard</button>
          <button onClick={handleClick} style={{ opacity: '0.8' }} class="btn btn-secondary navbar-btn" name='search'>Search</button>
          <button onClick={handleClick} style={{ opacity: '0.8' }} class="btn btn-secondary navbar-btn" name='memory'>Memories</button>

          <button onClick={handleClick} style={{ opacity: '0.5' }} class="btn btn-danger" name='login'>LOGOUT</button>
        </div>}
        {/* {!showButtons && <div>
            <img src={Menu} alt="" onClick={handleMenuClick} id='Menu_Navbar'/>
            {showMenu && <>
                <img src={Menu} alt="" onClick={handleMenuClick} id='Menu_Navbar'/>

                <div style={{widht:'20vw', height:'50vh', backgroundColor:'red'}}>
                    ShowMenu
                </div>
            </>}
        </div>} */}
        <div className="navbar-menu-container m-3">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <button className='btn btn-secondary navbar-btn' style={{opacity:'0.7'}} name = {item.name} onClick={handleClick}>{item.text}</button>
                </ListItemButton>
              </ListItem>
            ))}
          <button onClick={handleClick} style={{ opacity: '0.5', marginLeft:'18px' }} class="btn btn-danger" name='login'>LOGOUT</button>


          </List>
          <Divider />
        </Box>
      </Drawer>
      </section>
    </>
  )
}

export default Navbar