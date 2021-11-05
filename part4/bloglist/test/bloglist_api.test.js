const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')


const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  await Blog.deleteMany({})

  const blogObjects =helper.initialBlog.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

},100000)

describe('get request',() => {

  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('blogs are returned as json',async() => {
    await api
      .get('/api/blogs')
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  },100000)

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set(headers)

    expect(response.body).toHaveLength(helper.initialBlog.length)
  },100000)

  test('unique identifier property of the blog posts is named id', async() => {
    const response = await api.get('/api/blogs').set(headers)
    expect(response.body[0].id).toBeDefined()
  })
})


describe('post request',() => {

  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('a valid blog can be added', async() => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    const request= await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.bloglistInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

    const titles = blogsAtEnd.map(t => t.title)
    expect(titles).toContain(
      'Type wars'
    )
  },100000)

  test('adding a blog fails with the proper status code if a token is not provided',async() => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    const request= await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.bloglistInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length )

  })

  test('likes property default value is 0 if missing',async() => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    const request= await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.bloglistInDb()
    expect(blogsAtEnd[5].likes).toBeDefined()

  })

  test('blog without title and url is not added', async () => {
    const newNote = {
      author: 'Jon B Bellion'
    }

    await api
      .post('/api/blogs')
      .set(headers)
      .expect(400)

    const blogsAtEnd = await helper.bloglistInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  })

})

describe('put request',() => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  test('a blog can be updated',async() => {
    const blogsAtStart = await helper.bloglistInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = { ...blogToUpdate,likes:blogToUpdate.likes+ 1000 }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .set(headers)
      .expect(200)

    const blogsAtEnd = await helper.bloglistInDb()
    expect(blogsAtEnd[0]).toEqual(updatedBlog)

  })

})

describe('delete request',() => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    const request= await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
  })

  test('a blog can be deleted',async() => {
    const blogsAtStart = await helper.bloglistInDb()
    const blogToDelete = blogsAtStart.filter(b => b.title === 'Type wars' )
    await api
      .delete(`/api/blogs/${blogToDelete[0].id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.bloglistInDb()

    //expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)

    const titles = blogsAtEnd.map(t => t.title)

    expect(titles).not.toContain(blogToDelete.title)

  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('invalid users are not created',async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'user',
      password: 'password 1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })
})





afterAll(() => {
  mongoose.connection.close()
})

