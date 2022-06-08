import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper,Input } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './Styles';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/Actions_posts';
import { getPosts } from '../../actions/Actions_posts';
import {useNavigate} from 'react-router-dom'



function Form({ currentId, setCurrentId }) {
    const classes = useStyles();
    const page=1;
   const Navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        title: " ", message: "  ", tags: " ", selectedFile: " "
    })

       const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const OnSubmitClick = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId,{...postData, name:user?.result?.name}))
            clear();
            Navigate('/'); 
           
                    
        }
        else {
            dispatch(createPost({...postData, name:user?.result?.name}));
            Navigate('/'); 
            dispatch(getPosts(page));
            clear();
            
        }
        
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center" color="primary" style={{fontFamily:"Cookie"}} >
              Need to sign in to create ur Images and to like others Images.
            </Typography>
          </Paper>
        );
      }

    const clear = () => {
        setCurrentId(null);
        setPostData({title: " ", message: " ", tags: " ", selectedFile: " "})
    }

    return (

        <Paper className={classes.paper} elevation={6} id="form">
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`}
                onSubmit={OnSubmitClick}>
                <Typography variant="h5" className={classes.formHeading}> {currentId ? "Editing" : "Creating" } a Image</Typography>

             
                <TextField
                 name="title" variant='outlined' label="Title" fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

                <TextField name="message" variant='outlined' label="Message" fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

                <TextField name="tags" variant='outlined' label="Tags" fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} />

                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} 
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
<div className={classes.buttons}>
                <Button className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={postData.title===" "||postData.message===" "||postData.tags===" "||postData.selectedFile===" "}
                    type='submit'
                    >Submit
                    
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={clear}
                    style={{height:"40px"}}
                    >Clear
                </Button>

                </div>

            </form>
        </Paper>
    )
}

export default Form