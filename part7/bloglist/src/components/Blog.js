import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, editBlog, addComment } from '../reducers/blogReducer';




const Blog = () => {

  const { id } = useParams();
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [blog, setBlog] = useState(null)
  // const [comments, setComments] = useState(null)
  const [newComment, setNewComment] = useState('')
  // const blog = blogs.find(item => item.id === id)


  useEffect(() => {
    setBlog(blogs.find(item => item.id === id))
  }, [blogs, id])



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

  const handleAddComment = () => {
    dispatch(addComment(id, {
      comment: newComment
    }))
    setNewComment('')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
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
      <h3>Comments</h3>
      <div>
        <input
          type="newComment"
          id="newComment"
          value={newComment}
          name="newComment"
          onChange={({ target }) => setNewComment(target.value)} />
        <button onClick={handleAddComment}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((comment, index) => (<li key={index}>{comment}</li>))}
      </ul>
    </div>
  )
}

export default Blog