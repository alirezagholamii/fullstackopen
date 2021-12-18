import React from "react";
import { useParams } from "react-router";
import { useSelector } from 'react-redux'

const User = () => {
  const { id } = useParams();
  const users = useSelector(state => state.users)
  const user = users.filter(item => item.id === id);
  if (user.length === 0) {
    return (
      <div>user not found</div>
    )
  }
  const { blogs } = user[0]


  if (blogs.length === 0) {
    return (<div>
      this user is lazy!!!
    </div>)
  }

  return (
    <div>
      {blogs.map(blog => (
        <ul key={blog.id}>
          <li>title: {blog.title}</li>
          <li>likes: {blog.likes}</li>
          <li>url: {blog.url}</li>
        </ul>
      ))}
    </div>
  )
}

export default User