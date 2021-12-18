import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, editBlog, removeBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { showNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, user])

  const handleLogin = async (obj) => {
    dispatch(login(obj))
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
    dispatch(logout())
  }

  const handleAddLike = (blog) => {
    try {
      const copyOfBlog = { ...blog }
      copyOfBlog.likes++
      dispatch(editBlog(copyOfBlog))
    } catch (e) {
      console.log(e);
    }
  }

  const handleRemoveBlog = (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!confirm) { return }
    dispatch(removeBlog(blog.id))
  }

  const Home = () => {
    return (
      <>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlogHandler={createBlogHandler} />
        </Togglable>
        <div id="blogList">
          {blogs.map(blog =>
            <Blog addLike={() => { handleAddLike(blog) }} removeBlog={() => { handleRemoveBlog(blog) }} key={blog.id} blog={blog} />
          )}
        </div>
      </>
    )
  }
  return (
    <Router>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm login={handleLogin} />
        :
        <div>
          <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
          <Switch>
            <Route exact path="/users/:id">
              <User />
            </Route>
            <Route exact path="/users">
              <Users users={users} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>}
    </Router>
  )
}

export default App