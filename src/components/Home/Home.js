import React,{useEffect,useState} from 'react'
import {Grow, Container,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core';
import { useNavigate,useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import ChipInput from 'material-ui-chip-input'
import Post from '../Post/Post';
import Form from '../form/Form';
import {getPostsBySearch} from '../../actions/Actions_posts';
import Paginate from '../Paginate';
import useStyles from './Styles';

function useQuery()
{
  return new URLSearchParams(useLocation().search);
}
function Home() {
    const classes=useStyles();
    const dispatch=useDispatch();
    const [currentId, setCurrentId] = useState(0);
   const query=useQuery();
   const Navigate=useNavigate();
   const page=query.get('page')||1;
   const searchQuery=query.get('searchQuery')
   const [search,setSearch]=useState('');
   const [tags,setTags]=useState([]);

    // useEffect(()=>
    // {
    
    //   dispatch(getPosts())
  
    // },[currentId,dispatch]);

function handleKeyPress(e)
{
if(e.keyCode===13)
{
SearchPost();
}
}

function handleAdd(tag)
{
  setTags([...tags,tag])
}

function handleDelete(tagToDelete)
{
  setTags(tags.filter((tag)=>tag!==tagToDelete));
}

const SearchPost = () => {
  if (search.trim() || tags) {
   
    dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
    Navigate(`/post/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
  }
 
  else {
    Navigate('/');
  }
};
  return (
    <Grow in>
  <Container maxWidth="xl">
  <AppBar className={classes.appBarSearch} position="static" color="inherit">
          <TextField name="search" variant="outlined" label="Search"  value={search} 
          className={classes.searchBar}
          onKeyPress={handleKeyPress}
           onChange={(e)=>setSearch(e.target.value)} />
         

          <ChipInput style={{margin:'10px 0px'}}
          value={tags}
      onAdd={handleAdd}
      onDelete={handleDelete}
      label="Search Tags"
      variant='outlined'  />  

<Button onClick={SearchPost} className={classes.SearchButton}
variant="contained"
 color="primary">Search</Button>
        </AppBar>
    <Grid container justifyContent="space-between"
     alignItems="stretch" spacing={3}
     className={classes.gridContainer}
     >
  
  <Form currentId={currentId} setCurrentId={setCurrentId}/>


    <Grid  item >
<Post setCurrentId={setCurrentId} />
      </Grid>


      <Grid item xs={12} sm={12} md={12}>
                  
          {(!searchQuery&&!tags.length)&&(<Paper className={classes.Pagination} elevation={6}> 
          
        </Paper>
        )}
         
      </Grid>
      <Paginate page={page}/>
    </Grid>
  </Container>
</Grow>
  )
}

export default Home