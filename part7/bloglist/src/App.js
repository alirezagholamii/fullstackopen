import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'





const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  console.log('Oh oH')


  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      // getBlogs()
      dispatch(initializeBlogs())

    }
  }, [dispatch])

  const handleLogin = async (obj) => {
    try {
      const user = await loginService.login(obj)
      setUser(user)

      blogService.setToken(user.token)
      // getBlogs()
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(initializeBlogs())

    } catch (e) {
      console.log(e.response.data.error);
      dispatch(showNotification(e.response.data.error, 'error', 5))
    }
  }

  const createBlogHandler = (obj) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(obj))
      dispatch(showNotification(`a new Blog ${obj.title} by ${obj.author} added`, 'success', 5))

    } catch (e) {
      console.log(e);
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const handleAddLike = async (blog) => {
    try {
      const copyOfBlog = { ...blog }
      copyOfBlog.likes++
      await blogService.edit(copyOfBlog)
      const newBlogs = blogs.map((item) => {
        if (item.id === blog.id) {
          item.likes++
          return item
        }
        return item
      }).sort((a, b) => b.likes - a.likes)
      // setBlogs(newBlogs)
    } catch (e) {
      console.log(e);
    }
  }
  const handleRemoveBlog = async (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!confirm) { return }

    try {
      await blogService.remove(blog.id)
      const newBlogs = blogs
        .filter((item) => item.id !== blog.id)
        .sort((a, b) => b.likes - a.likes)
      // setBlogs(newBlogs)
    } catch (e) {
      console.log(e);
    }
  }




  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm login={handleLogin} />
        :
        <div>
          <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlogHandler={createBlogHandler} />
          </Togglable>
          <div id="blogList">
            {blogs.map(blog =>
              <Blog addLike={() => { handleAddLike(blog) }} removeBlog={() => { handleRemoveBlog(blog) }} key={blog.id} blog={blog} />
            )}
          </div>

        </div>}
    </div>
  )
}

export default App