import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import Login from './components/Login'
import User from './components/User'
import UserList from './components/UserList'
import Blog from './components/Blog'

import storage from './utils/storage'

import { initializeBlog } from './reducers/blogReducer'
import { loginUser } from './reducers/authReducer'
import { initializeUsers } from './reducers/userReducer'
import { Container } from '@mui/material'

const App = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)


  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlog())
    const user = storage.loadUser()
    dispatch(loginUser(user))
  },[dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch? users.find(user => user.id === userMatch.params.id): null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch? blogs.find(blog => blog.id === blogMatch.params.id): null

  const blogInUserMatch = useRouteMatch('/users/blogs/:id')
  const userBlog = blogInUserMatch? blogs.find(blog => blog.id === blogInUserMatch.params.id): null


  return (
    <Container maxWidth = 'xl' disableGutters>
      <Switch>
        <Route path = "/login">
          <Login/>
        </Route>
        <Route path = "/users/blogs/:id">
          <Blog blog={userBlog}/>:
        </Route>
        <Route path = "/users/:id">
          <User user={user}/>
        </Route>
        <Route path = "/users">
          <UserList/>
        </Route>
        <Route path = "/blogs/:id">
          <Blog blog={blog}/>
        </Route>
        <Route path= "/">
          <BlogList/>
        </Route>
      </Switch>
    </Container>
  )
}

export default App