import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

  return (<div>
    <h3>Users</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => <tr key={user.id}>
          <td>
            <Link to={'/users/' + user.id}>{user.name}</Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>)}
      </tbody>

    </table>
  </div>)
}

export default Users