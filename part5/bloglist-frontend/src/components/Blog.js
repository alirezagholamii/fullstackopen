import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, addLike, removeBlog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const visibilityHanlder = (event) => {
    event.preventDefault()
    setIsVisible(!isVisible)
  }
  const user = JSON.parse(localStorage.getItem('loggedUser'))
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    isVisible === false ?
      <div style={blogStyle} className="blog">
        {blog.title} <button className="show" onClick={visibilityHanlder}>view</button>
      </div>
      :
      <div style={blogStyle}>
        <p> {blog.title}  <button onClick={visibilityHanlder}>hide</button></p>
        <p>{blog.url}</p>
        <p><span className="like-number">{blog.likes}</span><button className="likeBtn" onClick={addLike}>like</button></p>
        <p>{blog.author}</p>
        {blog.author === user?.name ? <p><button id="removeButton" style={{ backgroundColor: 'red' }} onClick={removeBlog}>remove</button></p> : null}

      </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}


export default Blog