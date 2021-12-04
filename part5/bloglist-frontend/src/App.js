import React, { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('ERROR')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async(blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessageType('SUCCESS')
      setMessage(`A new Blog - ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }catch(exception){
      setMessageType('ERROR')
      setMessage('Couldn\'t add new blog due to some error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)

    }

  }

  const incrementLike = async(event) => {
    const blogId = event.target.value
    const blog=blogs.find(b => b.id===blogId)
    const updatedBlog = { title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user:blog.user.id,
    }
    const newBlog = await blogService.update(blogId,updatedBlog)
    const blogWithUser = { ...newBlog,user:{ name:blog.user.name } }
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog : blogWithUser))
    setMessageType('SUCCESS')
    setMessage(`You have Liked - ${newBlog.title} by ${newBlog.author} `)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }

  const removeBlog= async(event) => {
    const id = event.target.value
    console.log('Blog ID',id)
    const filteredBlog = blogs.filter(blog => blog.id === id)
    const blogTitle = filteredBlog[0].title
    const blogId = filteredBlog[0].id
    if (window.confirm(`Delete ${blogTitle} ?`)) {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId ))
      console.log('Blogs',blogs)
      setMessageType('SUCCESS')
      setMessage(`${blogTitle} was successfully deleted`)
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }

  }



  const blogFormRef = useRef()
  const blogForm= () => (
    <Togglable buttonLabel = "Create new Blog" ref = {blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )



  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} messageType={messageType}/>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  return(
    <div>
      <h2>Blogs</h2>
      <Notification message={message} messageType={messageType} />
      <p>{user.name} is logged in
        <button onClick={handleLogout}>Logout</button></p>
      {blogForm()}
      {blogs
        .sort((a,b) => a.likes - b.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeBlog={removeBlog}/>
        )}
    </div>
  )
}

export default App