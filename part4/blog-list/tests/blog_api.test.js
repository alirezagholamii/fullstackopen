const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
let token = ''
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const newUser = {
    'blogs': [],
    'username': 'root',
    'name': 'alireza',
    'password': '123456'
  }

  await api
    .post('/api/users')
    .send(newUser)
  const result = await api
    .post('/api/login')
    .send(newUser)


  token = result.body.token
  await Blog.insertMany(helper.initialBlogs)
})


describe('viewing a specific blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs').set('Authorization', `bearer ${token}`)


    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('verifying the existence of _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })

  test('add new blog to blogs', async () => {
    const blog = {
      title: 'another Title',
      author: 'Alireza Gholami',
      url: 'https://www.linkedin.com/in/alireza-gholami-16b29428/',
      likes: '896'
    }
    const blogsLengthBefore = (await api.get('/api/blogs').set('Authorization', `bearer ${token}`))
      .body.length
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)
    const blogsLengthAfter = (await api.get('/api/blogs').set('Authorization', `bearer ${token}`))
      .body.length
    expect(blogsLengthAfter).toBe(blogsLengthBefore + 1)

  })
})

test('if likes property missed, it will be 0', async () => {
  await Blog.deleteMany({})

  const blog = {
    title: 'another Title Two',
    author: 'Alireza Gholami',
    url: 'https://www.linkedin.com/in/alireza-gholami-16b29428/',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = (await api.get('/api/blogs').set('Authorization', `bearer ${token}`)).body
  expect(blogs[0].likes).toBe(0)

})

test('if url or title missed, it returns 400 error', async () => {
  const blog = {
    author: 'Alireza Gholami',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(400)

})

test('fail at posting a blog without valid token', async () => {
  const blog = {
    title: 'another Title',
    author: 'Alireza Gholami',
    url: 'https://www.linkedin.com/in/alireza-gholami-16b29428/',
    likes: '896'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(401)
})


afterAll(() => {
  mongoose.connection.close()
})