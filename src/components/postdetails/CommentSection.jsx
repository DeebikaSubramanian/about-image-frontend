import React,{useRef,useState} from 'react';
import {Typography,TextField,Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import useStyles from './Styles';
import {commentPost} from '../../actions/Actions_posts';


function CommentSection({post})
 {
    const user=JSON.parse(localStorage.getItem('profile'));
    const classes=useStyles();
    const [comments,setComments]=useState(post?.comments);
    const [comment,setComment]=useState('');
    const dispatch=useDispatch();
    const commentsRef=useRef();


    async function handleClick()
    {
        const finalComment=`${user.result.name}:${comment}`;
        const newComments=await dispatch(commentPost(finalComment,post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({behavior:"smooth"});
    }; 

  return (
    <div>
  <div className={classes.commentsOuterConatiner}>
      <div className={classes.commentsInnerConatiner}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {
              comments.map((e,i)=>{

                  return(
                      
                  <Typography key={i} gutterBottom variant="subtitle1">
                 <strong>{e.split(':')[0]}</strong>
                 {e.split(':')[1]}

              </Typography>
              )
                  
              })
          }
          <div ref={commentsRef} />
          
      </div>
      {user?.result?.name && (
      <div style={{width:"70%"}}> 
          <Typography gutterBottom variant="h6">Write a Comment</Typography>
          <TextField fullWidth minRows={4} 
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={(e)=>setComment(e.target.value)} />
          <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} 
          variant="contained"
          color="primary"
          onClick={handleClick}>
              Comment
          </Button>
      </div>
      )}
    </div>
    </div>
  )
}

export default CommentSection;
