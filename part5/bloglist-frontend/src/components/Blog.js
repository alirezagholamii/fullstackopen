import React, { useState } from 'react'

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
      <div style={blogStyle}>
        {blog.title} <button onClick={visibilityHanlder}>view</button>
      </div>
      :
      <div style={blogStyle}>
        <p> {blog.title}  <button onClick={visibilityHanlder}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={addLike}>like</button></p>
        <p>{blog.author}</p>
        {blog.author === user.name ? <p><button style={{ backgroundColor: 'red' }} onClick={removeBlog}>remove</button></p> : null}

      </div>

  )
}

export default Blog