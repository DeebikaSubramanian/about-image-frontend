import React  from 'react';
import {Container} from '@material-ui/core';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/auth/Auth';
import Post from './components/Post/Post';
import PostDetails from './components/postdetails/PostDetails';

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Form from './components/form/Form';


function App() {

  const user=JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
    <Container maxWidth="xl">
<Navbar/>
<Routes>
    <Route  path="/" element={<Navigate to="/post"/>}/>
   <Route path='/auth' element={!user?<Auth/>:<Navigate to="/post"/>}/>
  <Route path="/post" element={<Home/>} />
  <Route path="post/search" element={<Home/>}/>
  <Route path="/post/:id" element={<PostDetails/>} />
  </Routes> 
  </Container>
  </BrowserRouter>
  )
}

export default App;