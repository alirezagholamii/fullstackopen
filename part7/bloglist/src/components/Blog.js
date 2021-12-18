import React from 'react'
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, editBlog } from '../reducers/blogReducer';




const Blog = () => {

  const { id } = useParams();
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blog = blogs.find(item => item.id === id)
  if (!blog) {
    return (
      <div>
        blog not found
      </div>
    )
  }

  const handleAddLike = () => {
    const copyOfBlog = { ...blog }
    copyOfBlog.likes++
    dispatch(editBlog(copyOfBlog))
  }

  const handleRemoveBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!confirm) { return }
    dispatch(removeBlog(blog.id))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <h2> {blog.title}</h2>
      <p>{blog.url}</p>
      <p><span className="like-number">{blog.likes}</span><button className="likeBtn" onClick={handleAddLike}>like</button></p>
      <p>{blog.author}</p>
      {blog.author === user?.name ? <p><button id="removeButton" style={{ backgroundColor: 'red' }} onClick={handleRemoveBlog}>remove</button></p> : null}
    </div>
  )
}

export default Blog