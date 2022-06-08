import React, {useState} from 'react'
import useStyles from './Styles';
import { getPosts } from '../../../actions/Actions_posts';
import { useNavigate } from 'react-router-dom';

import {
    Card,
    CardActions,
    CardMedia,
    Button,
    Typography,
    CardContent,
    ButtonBase
} from '@material-ui/core'

import { ThumbUpAlt, Edit, Delete,ThumbUpAltOutlined } from '@material-ui/icons';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../actions/Actions_posts'

function Single_post({post,setCurrentId}) {
    
    const classes = useStyles();
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    const [likes,setLikes]=useState(post?.likes);
    const page=1;

    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAlt fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

      function openPost()
      {
        Navigate(`/post/${post._id}`);
      }

      async function OnLikeClick()
      {
         dispatch(likePost(post._id));

         if(likes.find((like) => like === (user?.result?.googleId || user?.result?._id)))
         {
            setLikes(post.likes.filter((id)=>id!==(user?.result.googleId)||user?.result?._id))
         }
         else
         {
            setLikes([...post.likes,(user?.result.googleId)||user?.result?._id]);

      }
    }

    function EditOnClick()
    {
        setCurrentId(post._id);
                   
    }
    

    return (

        <Card className={classes.card} raised elevation={6}>
               <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
            
            <CardMedia className={classes.media}
                image={post.selectedFile}
                title={post.title}></CardMedia>

            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

           


            <div className={classes.details}>
                <Typography
                    variant="body2"
                    color="textSecondary">

                    {post.tags.map((tag) => {
                        return (
                            `#${tag} `
                        )
                    })}

                </Typography>
            </div>
            <Typography className={classes.title}
                    variant="h5"
                    gutterBottom>
                    {post.title}
                </Typography>
            <CardContent>
                <Typography 
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    >
                    {post.message}
                </Typography>

                
            </CardContent>

            </ButtonBase>

            <CardActions className={classes.cardActions}>

                <Button size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={OnLikeClick}>
                        <Likes />
               
                </Button>
                {(user?.result?.googleId===post?.creator||user?.result?._id===post?.creator)&&

(<div><a href="#form" className={classes.link}>
    <Button
        style={{ color: "blue" }}
        size="small"
        onClick={EditOnClick}  >
        <Edit fontSize="default" />Edit
    </Button></a> 
</div>)}
                    {(user?.result?.googleId===post?.creator||user?.result?._id===post?.creator)&&

                (<Button size="small"
                    color="primary"
                    onClick={() => {dispatch(deletePost(post._id));dispatch(getPosts(page));}}>

                    <Delete fontSize="small" />
                    Delete </Button>)}

            </CardActions>

        </Card>
    )
}

export default Single_post;