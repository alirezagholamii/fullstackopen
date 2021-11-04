const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  user._id = user._id.toString()
  console.log(user)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog || !blog.user) {
    return response.status(404).json({ error: 'Not found' })
  }
  if (blog.user.toString() === request.user) {

    await Blog.findByIdAndRemove(request.params.id)
    const user = await User.findById(request.user)
    user.blogs = user.blogs.filter((blog) => (blog.toString() !== request.params.id))
    await user.save()
    response.status(204).end()
  } else {
    return response.status(404).json({ error: 'Not found*' })
  }


})

blogsRouter.put('/:id', (request, response, next) => {
  const blog = {
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


module.exports = blogsRouter