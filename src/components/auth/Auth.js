import React, {useState,useEffect} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { LockOutlined } from '@material-ui/icons';
import useStyles from './Styles';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {gapi} from 'gapi-script'
import { useNavigate } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';

const initialValues={
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  confirmPassword:""
}

function Auth() {

  const Navigate=useNavigate();
  useEffect(()=>
  {
    function start()
    {
      gapi.client.init({
        clientId:"975235255040-8976h9rbpej45b6g38eh9o4eneri318o.apps.googleusercontent.com",
        scope:""
      })
    };
    gapi.load("client:auth2",start);
  });

    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialValues);

    const classes=useStyles();
    const dispatch=useDispatch();


    const [isSignup,setIsSignup]=useState(true); 

    async function googleSuccess (res)
    {
      const result=res?.profileObj;
      const token=res?.tokenId;

      try {
        dispatch({type:'AUTH', data: {result,token}});
        Navigate('/');
        } catch (error) {
        console.log(error)
      }
     
    }
    function googleFailure(error)
    {
      console.log(error)
      console.log("Google SignIn was unsuccessful. Try Again")
    }
    function toggleSign()
    {
      setIsSignup(!isSignup)
      setShowPassword(false)
    }
    function handleShowPassword()
    {
      setShowPassword(!showPassword);
    }

    
    function handleChange(e)
    {
setFormData({...formData,[e.target.name]:e.target.value})
    }

    function submitOnClick(e)
    {
      e.preventDefault();
      
        if(isSignup)
         {
         
       
          dispatch(signup(formData,Navigate))
          
     
      }
      
        else{
          dispatch(signin(formData,Navigate))
          }
      
     
     
    }

  return (
   <Container component="main" maxWidth="xs">
     <Paper className={classes.paper} elevation={3}>
       <Avatar className={classes.avatar}>
         <LockOutlined/>
       </Avatar>
       <Typography variant="h5">{isSignup?"Sing Up":"Sign In"}</Typography>
       <form className={classes.form} onSubmit={submitOnClick}>
<Grid container spacing={2}>
  {
        isSignup && (
      <>
      <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half  />
      <Input name="lastname" label="Last Name" handleChange={handleChange} half  />
     </>
    )
  }

  <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
  <Input name="password" label="Password" handleChange={handleChange} 
  type={showPassword? "text":"password"} 
  handleShowPassword={handleShowPassword}/>

  {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
  <div className={classes.sample}>
         <p><u>Sample Credentials</u></p>
         <p>UserName:karthish@gmail.com</p>
         <p>Password:12345678</p>
       </div>
</Grid>



<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
  {isSignup?'Sign Up' : 'Sign In' }
</Button>

<GoogleLogin 
clientId='975235255040-8976h9rbpej45b6g38eh9o4eneri318o.apps.googleusercontent.com'
onSuccess={googleSuccess}
onFailure={googleFailure}
cookiePolicy={"single_host_origin"}
// isSignedIn={true}
className={classes.googleButton}
/>

<Grid container justify="flex-end">
  <Grid item>
    <Button onClick={toggleSign}>
      {isSignup?"Aleready have an account? Sign In" : "Don't have an acount? Sign Up"}
    </Button>
  </Grid>
</Grid>
       </form>
      
     </Paper>
   </Container>
  )
}

export default Auth