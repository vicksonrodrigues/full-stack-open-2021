import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import BlogMenu from './BlogMenu'
import { useSelector } from 'react-redux'
import NewBlog from './NewBlog'
//import Togglable from './Togglable'
import { Button,  Fab,  Grid, Paper, Stack, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const User=({ user }) => {
  const currentUser = useSelector(state => state.currentUser)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //const blogFormRef = React.createRef()

  if (!user) {
    return null
  }
  else if (currentUser && currentUser.username===user.username){

    return(
      <div>
        <BlogMenu/>
        <Grid container
          direction="rows"
          justifyContent="center"
          alignItems="left"
          padding={2}
          mt={1}
          boxShadow={4}
          border={1}
          component={Paper}>
          <Grid item xs={12} borderBottom={2} >
            <Typography align='center' variant='h4'>
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={11} padding={2}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              width={500}
            >
              <Typography align='center' variant='h4'>
                Added blogs
              </Typography>
              {user.blogs.map(blog =>
                <Button
                  component={Link}
                  to = {`/users/blogs/${blog.id}`}
                  key={blog.id}>
                  {blog.title}
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={1} position='relative'>
            <Tooltip title ="New Blog Entry">
              <Fab color="primary" aria-label="add"
                onClick={handleClickOpen}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                }}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
        <NewBlog handleClose={handleClose} open={open}/>
      </div>
    )
  }
  else{
    return(
      <div>
        <BlogMenu/>
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
            <Typography align='center' variant='h4'>
              {user.name}
            </Typography>
          </Grid>
          <Grid item xs={12} padding={2}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
            >
              <Typography align='center' variant='h4'>
                Added blogs
              </Typography>
              {user.blogs.map(blog =>
                <Button
                  component={Link}
                  to = {`/users/blogs/${blog.id}`}
                  key={blog.id}>
                  {blog.title}
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </div>
    )

  }

}
export default User

/* <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog/>
        </Togglable>*/