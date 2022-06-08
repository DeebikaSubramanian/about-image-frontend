import React,{useState,useEffect} from 'react'
import {AppBar,Typography, Avatar, Toolbar, Button} from '@material-ui/core';
import useStyles from './Styles'
import {Link, useNavigate,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import Form from '../form/Form';

function Navbar() {

const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))

const classes=useStyles();

const dispatch=useDispatch();

const Navigate=useNavigate();

const location=useLocation();

// console.log(user)

function logoutOnClick()
{
dispatch({type:"LOGOUT"})
setUser(null)
Navigate('/');

}


useEffect(()=>
{
const token=user?.token;

// JWT
if(token)
{
  const decodedToken=decode(token);

  if (decodedToken.exp*1000<new Date().getTime())
  {
    logoutOnClick();
  }

}

setUser(JSON.parse(localStorage.getItem('profile')));
},[location]);




  return (
    // <div className={classes.appBar1}>
    <AppBar className={classes.appBar} position='static' color="inherit">
        <div className={classes.brandContainer}>
    <Typography component={Link} to= "/" className={classes.heading} color="primary" variant="h4" align="center">About the Image</Typography>
   
    </div>
    <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>

        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl} >
             {user?.result.name.charAt(0)}</Avatar>

             <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
             <Button variant="contained" className={classes.logout} color="primary" onClick={logoutOnClick}>
                Logout
             </Button>
    </div>): (<Button component={Link} 
    to="/auth" 
    variant="contained" 
    color="primary">
        Signin
        </Button>)}
    </Toolbar>
  

    
</AppBar>
// </div>
  )
}

export default Navbar