
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: ({ graphQLErrors, networkError }) => {
      console.log(networkError.errors);
    }
  })


  if (!props.show || result.loading) {
    return null
  }

  const authors = result.data.allAuthors || []

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, born }
    })
    console.log('8====> edit author')
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>
        Set birthyear
      </h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option hidden> select one</option>
            {
              authors.map(item => <option value={item.name} key={item.name}>{item.name}</option>)
            }
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(+target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>


    </div>
  )
}

export default Authors
