const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }).populate('comments', { comment:1,id:1 })

  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).populate('comments',{ comment:1,id:1 })
  response.json(blogs)
})


router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }
  const blogsInUser=user.blogs
  await blog.remove()
  user.blogs = blogsInUser.filter(b => b.toString() !== blog.id.toString())
  await user.save()
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.post('/:id/comments', async (request,response) => {
  console.log('Comment is ',request.body.comment)
  const comment = new Comment({
    comment:request.body.comment,
    blog:request.params.id,
  })

  const blog = await Blog.findById(request.params.id)
  const savedComment = await comment.save()
  blog.comments= blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = router