import './header.css';
import Navbar from '../Navbar/navbar';
import axios from 'axios';

import loginImg from "../../Assets/loginImg.svg"
import toast,{Toaster} from 'react-hot-toast';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useEffect} from 'react';
import { IoIosLogOut } from "react-icons/io";
import BButton from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Avatar from '@mui/material/Avatar';

//RTK...
import { useSelector } from 'react-redux';

//Icons...
import { BsGeoAlt, BsFillAlarmFill, BsPerson, BsCart2 } from "react-icons/bs";
import RegisterModal from '../../Registerpage';
import LoginModal from '../../Loginpage';
import { Link } from 'react-router-dom';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #d3d3d3",
  backgroundColor: '#F4F4F4',//alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: '#F4F4F4',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));





export default function Header() {
  const [modalShow, setModalShow] = React.useState(false);


//RTK...
const cartCount = useSelector((state)=>state.CartReducer.cartValues.length);  //cartCount...
const totalProductPrice = useSelector((state)=>state.CartReducer.totalPrice);  //totalPrice...


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };



  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 22,
      top: 3,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      color: '#373737',
      backgroundColor: '#ffe589',
      textAlign: 'center',
      fontSize: '11px'
    },
  }));




  const isPaymentRoute = window.location.pathname === '/payment';
  //CARTLIST----

 const [cartHeader,setCartheader] = React.useState([]);

 //Modal...
 const [showLoginModal, setShowLoginModal] = React.useState(false);
 const [showRegisterModal, setShowRegisterModal] = React.useState(false);

 const handleLoginShow = () => {
  setShowLoginModal(true);
  setShowRegisterModal(false); // Close the register modal if it's open
};

 const handleLoginClose = () => setShowLoginModal(false);

 const handleRegisterShow = () => {
  setShowRegisterModal(true);
  setShowLoginModal(false); // Close the login modal if it's open
};
 const handleRegisterClose = () => setShowRegisterModal(false);







 //USER DATA AFTER LOGIN...
 const [userData,setUserData] = React.useState([]);





 const fetchUserData = async(e) =>{


    //Fetch user login data...
  try{
      let userGetdata = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/list`,{
          headers:{
              "method":'GET',
              'Content-Type':'application/json',
              'x-token':localStorage.getItem('token')
          }
      }).then(res=>setUserData(res.data)).catch(err=>toast.error(err.response.data.message))


  }
  catch(err){
      throw err;
  }
}








useEffect(() => {
  const cartFetched = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/list`);

      const filterUser = response.data.filter(obj=>obj.userId===userData.userEmail)
      if(filterUser){
        setCartheader(filterUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  cartFetched();



    if(localStorage.getItem('token')){
      
      localStorage.setItem('email',userData.userEmail)
      fetchUserData();
    }



}, [userData?.userEmail]);


//User-Logout....
const userLogout =()=>{
  let token = localStorage.getItem('token');

  if(token){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setTimeout(()=>{window.location.reload()},1000);
  }else{return false;}

}




  return (
    <>
      {/* {!isPaymentRoute ? (<> */}
      
      <Box sx={{ flexGrow: 1 }} className='header'>
        <AppBar position="static">
          <Toolbar>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              style={{ height: "35px", width: "125px", color: "green", fontWeight: "bold" }}
            >
              <a href="/" style={{ textDecoration: "none", color: "green" }}> DeMart </a>
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              style={{ fontSize: "14px", width: "125px", color: "black", fontWeight: "200" }}
            >
              <BsGeoAlt style={{ color: "green", fontWeight: 600 }} />  location
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              style={{ fontSize: "14px", width: "260px", color: "green", fontWeight: "200" }}
            >
              <BsFillAlarmFill style={{ color: "orange" }} />  Home Delivery available
            </Typography>



            <Search style={{ width: "35%", boxShadow: "0.5px 0.5px 3px #d3d3d3" }}>
              <StyledInputBase
                style={{ width: "100%" }}
                placeholder="What are you looking for?"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Stack direction="row">
              <Button variant="contained" style={{ backgroundColor: "#25a541" }}>SEARCH</Button>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>


              <IconButton
                style={{ marginRight: "30px" }}
                className="signin"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                 {localStorage.getItem('token')? 
                     <>
                      <Stack>
                          <Avatar src={userData.userProfile} title={userData.userName} style={{cursor:"pointer",width:"40px",height:"40px",boxShadow:'-1px 1px 3px grey'}}/>                  
                      </Stack> 
                            <IoIosLogOut style={{margin:'15px'}} title={'Logout'} onClick={userLogout}/>  
                            </>  /*---logout--*/
                      :
                   <> <BsPerson style={{ color: "green", fontWeight: "bold" }} /> &nbsp; <span style={{ fontSize: "13px", fontWeight: "bold" }} onClick={handleLoginShow}>Sign In / Register</span>  </>
                  }

              </IconButton>



              <IconButton className="cart" aria-label="cart" style={{ marginRight: "5px" }} >
                <Link href={"/mycart"} style={{color:"#373737"}}>
                  <StyledBadge badgeContent=  { cartHeader.length || "0"}>  {/*---{ cartCount || "0" }---* */}
                    <BsCart2 style={{ transform: "scaleX(-1)" }} />
                  </StyledBadge>
                </Link>
              </IconButton>

            </Box>


            <a href={"/mycart"} style={{textDecoration:"none", color:"#373737"}}>   <div style={{ fontSize: "14px", fontWeight: "bold" }}> <b> &#8377; { localStorage.getItem('email')?cartHeader.map(obj => obj.cartItems.reduce((acc, item) => acc + item.productPrice, 0)).reduce((acc, val) => acc + val, 0) || totalProductPrice : 0 }    </b>  </div>    </a>



            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
        <Navbar />
      </Box>





              





      {/*---------------------MODAL----closeButton-----*/}

      <LoginModal show={showLoginModal} handleClose={handleLoginClose} handleRegisterShow={handleRegisterShow}/>
      <RegisterModal show={showRegisterModal} handleClose={handleRegisterClose} handleLoginShow={handleLoginShow}/>




              {/* </>) :null } */}
 

    </>
  );
}