import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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
    }
  }, [])

  useEffect(() => {
    getBlogs()
  }, [])

  const getBlogs = async () => {
    const response = await blogService.getAll()
    setBlogs(response)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      getBlogs()
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch (e) {
      console.log(e.response.data.error);
      setNotification(e.response.data.error, 'error')
      // setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setNotification(null, null)
      }, 5_000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('create blog');
    try {
      const result = await blogService.create({
        title, author, url
      })
      console.log(result);
      setBlogs(blogs.concat(result))
      setTitle('');
      setAuthor('');
      setUrl('');
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
      {createForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createForm = () => (
    <form onSubmit={handleCreate} style={{ marginBottom: '2rem' }}>
      <h2>Create New</h2>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App