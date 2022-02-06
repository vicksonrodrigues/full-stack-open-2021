import React from 'react'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { blogComment } from '../reducers/blogReducer'
import {  Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import TelegramIcon from '@mui/icons-material/Telegram'

const CommentForm = ({ id }) => {
  console.log ('Comments id',id)
  const dispatch = useDispatch()

  const { reset:resetComment,...comments } = useField('text')

  const handleSubmit = async(event) => {
    event.preventDefault()
    if(comments.value)
    {
      const content = {
        comment: comments.value
      }
      if(content)
        dispatch(blogComment(id , content))
      dispatch(setNotification('a new comment added','success',5))
    }
    resetComment()
  }

  return(
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter your Comment here ... "
          {...comments}
        />
        <IconButton id="newComment" type="submit" sx={{ p: '10px' }} >
          <TelegramIcon/>
        </IconButton>
      </Paper>
    </div>
  )
}

const Comments = ({ comments, id }) => {

  if (comments.length === 0) {
    return (
      <div>
        <Grid item xs={12}>
          <Typography variant='h6' sx = {{ textAlign:'left' }}>
            Comments
          </Typography>
          <CommentForm id = {id}/>
        </Grid>
      </div>
    )
  }
  return (
    <div>
      <Grid item xs={12} >
        <Typography variant='h6' sx = {{ textAlign:'left' }}>
            Comments ({comments.length})
        </Typography>
        <Stack
          divider={<Divider variant='inset' orientation="horizontal"  />}
          spacing={2}
          margin={2}
          sx ={{ width: 600 }}
        >
          {comments.map(c => (
            <Box component="div"
              sx={{ p: '2px 4px' }}
              key={c.id}
            >
              {c.comment}
            </Box>
          ))}
        </Stack>
        <CommentForm id ={id}/>
      </Grid>
    </div>

  )
}

export default Comments

/*
<form onSubmit={handleSubmit}>
      Comment:
      <input {...comments}/>
      <button id="newComment" type='submit'>Add Comment</button>
    </form>
*/