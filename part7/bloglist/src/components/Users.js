import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (<div>
    <h3>Users</h3>
    <table>
      <thead>
        <th></th>
        <th>blogs</th>
      </thead>
      <tbody>
        {users.map(user => <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </tr>)}
      </tbody>
    </table>
  </div>)
}

export default Users