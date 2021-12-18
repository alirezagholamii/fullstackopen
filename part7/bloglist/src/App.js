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
  Switch, Route, Link
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

  const Navigation = () => {
    if (!user) {
      return (<></>)
    }
    const navStyle = {
      display: 'flex',
      backgroundColor: '#e5dede',
      gap: '10px',
      padding: '5px'
    }
    return (<nav style={navStyle}>
      <Link to="/blog">blog</Link>
      <Link to="/users">users</Link>
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
    </nav>)
  }


  return (
    <Router>
      <Navigation />
      <h1>Blogs App</h1>
      <Notification />
      {user === null ?
        <LoginForm login={handleLogin} />
        :
        <div>
          <Switch>
            <Route exact path="/users/:id">
              <User />
            </Route>
            <Route exact path="/users">
              <Users users={users} />
            </Route>
            <Route exact path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlogHandler={createBlogHandler} />
              </Togglable>
              <div id="blogList">
                {blogs.map(blog =>
                  <div key={blog.id}>
                    <Link to={'/blogs/' + blog.id}>{blog.title}</Link>
                  </div>
                )}
              </div>
            </Route>
          </Switch>
        </div>}
    </Router>
  )
}

export default App