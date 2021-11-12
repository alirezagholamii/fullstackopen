import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'




const App = () => {
  const [blogs, setBlogs] = useState([])


  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const blogFormRef = useRef()

  const setNotification = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()

    }
  }, [])


  const getBlogs = async () => {
    const response = await blogService.getAll()
    response.sort((a, b) => b.likes - a.likes)
    setBlogs(response)
  }

  const handleLogin = async (obj) => {
    try {
      const user = await loginService.login(obj)
      setUser(user)

      blogService.setToken(user.token)
      getBlogs()
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch (e) {
      console.log(e.response.data.error);
      setNotification(e.response.data.error, 'error')
      setTimeout(() => {
        setNotification(null, null)
      }, 5_000)
    }
  }

  const createBlog = async (obj) => {
    console.log('create blog');
    try {
      blogFormRef.current.toggleVisibility()

      const result = await blogService.create(obj)
      setBlogs(blogs.concat(result))
      setNotification(`a new Blog ${result.title} by ${result.author} added`, 'success')
      setTimeout(() => {
        setNotification(null, null)
      }, 5_000);

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
      setBlogs(newBlogs)
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
      setBlogs(newBlogs)
    } catch (e) {
      console.log(e);
    }
  }




  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      {user === null ?
        <LoginForm login={handleLogin} />
        :
        <div>
          <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
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