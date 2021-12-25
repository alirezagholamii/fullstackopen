import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { showNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Users from './components/Users'
import User from './components/User'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
      justifyContent: 'space-between',
      backgroundColor: '#e5dede',
      gap: '10px',
      padding: '5px'
    }
    return (
      <nav style={navStyle}>
        <div>
          <ButtonGroup color="primary" aria-label="large outlined primary button group">
            <Button> <Link to="/blog">blog</Link></Button>
            <Button><Link to="/users">users</Link></Button>
          </ButtonGroup>
        </div>
        <div>
          <span>{user.name} logged in</span>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
        </div>

      </nav>

    )
  }

  const containerClass = {
    display: 'flex',
    justifyContent: 'center'
  }


  return (
    <Container>
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
    </Container>

  )
}

export default App