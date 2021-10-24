const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'any Title',
    'author': 'Ahmad Gholami',
    'url': 'https://google2.com',
    'likes': 58,
  },
  {
    'title': 'Some Title',
    'author': 'Alireza Gholami',
    'url': 'https://google.com',
    'likes': 99,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    'title': 'oh Some Title',
    'author': 'Alireza Gholami',
    'url': 'https://google.com',
    'likes': 80,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}