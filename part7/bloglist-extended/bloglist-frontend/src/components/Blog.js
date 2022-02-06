import React from 'react'
import { likeBlog,deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import BlogMenu from './BlogMenu'
import Comments from './Comments'
import { Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const Blog = ({ blog }) => {
  const history = useHistory()
  let own = null
  const currentUser= useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const handleLike= () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`you liked '${blog.title}'`,'success',10))
  }

  const handleRemove= () => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`you removed '${blog.title}'`,'success',10))
    history.goBack()
  }


  if (!blog ) {
    return null
  }
  else{
    if(currentUser){
      own = currentUser.username===blog.user.username
    }
    return (
      <div>
        <BlogMenu />
        <Grid container
          direction="column"
          justifyContent="center"
          alignItems="left"
          padding={2}
          mt={1}
          boxShadow={4}
          border={1}
          component={Paper}>
          <Grid item xs={12} borderBottom={2} >
            <Typography align='center' variant='h4'
            >
          BLOG
            </Typography>
          </Grid>
          <Grid item xs={12} padding={2}>
            <Card sx={{ minWidth:600 ,boxShadow:2 }}>
              <CardContent sx={{ overflowWrap:'break-word'  }}>
                <Typography gutterBottom variant="h5" component="div" >
                    Title: {blog.title}
                </Typography>
                <Typography gutterBottom variant="body2" component="div" >
                    Author: {blog.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflowWrap:'break-word'  }}>
                    URL: {blog.url}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Likes: {blog.likes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    created by <b>{blog.user.name}</b>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"  onClick={() => handleLike(blog.id)} variant='contained' startIcon={<ThumbUpIcon/>}>Like</Button>
                {own && <Button size="small" variant='contained' onClick={() => handleRemove(blog.id)}  endIcon={<DeleteForeverIcon/>}>Delete</Button>}
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} padding={2}>
            <Comments comments={blog.comments} id={blog.id}/>
          </Grid>

        </Grid>
      </div>
    )
  }
}


export default Blog