import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/system'

const NewBlog = ({  handleClose, open }) => {

  const dispatch = useDispatch()

  const { reset:resetTitle,...title } = useField('text')
  const { reset:resetAuthor,...author } = useField('text')
  const { reset:resetUrl,...url } = useField('text')

  const handleReset = () => {
    resetAuthor()
    resetTitle()
    resetUrl()
  }

  const handleNewBlog = async(event) => {
    event.preventDefault()
    const content={
      title:title.value,
      author:author.value,
      url:url.value,
    }
    dispatch(createBlog(content))
    dispatch(setNotification(`a new blog '${title.value}' by '${author.value}' added!`,'success',10))

    handleReset()
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ display: 'flex' }}>
          <Typography  variant='h6' flexGrow={3}  textAlign='center' >New Blog Entry</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box component= 'form' onSubmit={handleNewBlog}>
          <DialogContent dividers >
            <Box component='div' >
              <TextField
                required
                fullWidth
                variant='standard'
                id="standard-required"
                label="Title"
                helperText ='Required'
                {...title}
              />
            </Box>
            <Box component='div' >
              <TextField
                fullWidth
                variant='standard'
                id="standard-required"
                label="Author"
                {...author}
              />
            </Box>
            <Box component='div' >
              <TextField
                required
                fullWidth
                variant='standard'
                id="standard-required"
                label="Url"
                helperText ='Required'
                {...url}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button id="create" type='submit'>Add</Button>
            <Button id = "reset" type='reset' onClick={handleReset}>Reset</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  )
}

export default NewBlog