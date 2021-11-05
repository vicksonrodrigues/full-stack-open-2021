const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')



bloglistRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

bloglistRouter.post('/',userExtractor ,async(request, response) => {
  const body = request.body

  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url:body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

bloglistRouter.delete('/:id' ,userExtractor ,async(request, response) => {

  const user = await User.findById(request.user)
  console.log('User in delete ',user)
  const blog = await Blog.findById(request.params.id)
  console.log('Blog in delete',blog)

  if ( blog.user.toString() === user.id.toString() )
  {
    const blogsInUser=user.blogs

    user.blogs= blogsInUser.filter(b => b.toString() !== blog.id.toString())
    await user.save()
    await Blog.findByIdAndDelete(blog.id)
    response.status(204).json({ info: 'Blog has been successfully deleted' }).end()
  }
  else {
    return response.status(401).json({ error: 'Not Authorized to delete this blog' })

  }
})

bloglistRouter.put('/:id' , async(request, response) => {
  const body = request.body

  const blog ={
    title:body.title,
    author:body.author,
    url: body.url,
    likes:body.likes,
  }

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new:true })
  response.status(200).json(updateBlog.toJSON())

})

module.exports = bloglistRouter