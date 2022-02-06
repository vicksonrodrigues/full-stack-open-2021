import React,{ useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutUser } from '../reducers/authReducer'
import storage from '../utils/storage'

import Notification from './Notification'

import { AppBar, Avatar, Button, Divider, IconButton, MenuItem, Toolbar, Tooltip, Typography , Menu, Stack, ListItemIcon } from '@mui/material'
import { Logout } from '@mui/icons-material'



const BlogMenu = () => {
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
  }

  return(
    <AppBar position= "static" >
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{ mx: 2,  textAlign: 'center' }}>
           BLOG TREND
      </Typography>
      <Toolbar disableGutters>
        <Stack direction='row' divider ={<Divider orientation='vertical'  flexItem  />} sx = {{ flexGrow:1 }}>
          <Button color= "inherit" component= {Link} to = "/">
              Blogs
          </Button>
          <Button color= "inherit" component= {Link} to = "/users">
              Users
          </Button>
        </Stack>
        {currentUser?(
          <div>
            <Tooltip title="Account settings">
              <IconButton
                size='large'
                aria-label='current user'
                color='inherit'
                sx={{ ml: 2 }}
                onClick={handleMenuOpen}>
                <Avatar sizes='small'/>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 1,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -1,
                    mr: 1
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <MenuItem>
                <Avatar /> {currentUser.name}
              </MenuItem>
              <Divider />
              <MenuItem>
                <Button onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>Logout</Button>
              </MenuItem>

            </Menu>
          </div>)
          :<Button color= "inherit" component= {Link} to = "/login">
        Login
          </Button>}
      </Toolbar>
      <Notification/>
    </AppBar>
  )
}

export default BlogMenu