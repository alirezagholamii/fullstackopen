import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filterWord = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(item => item.content.includes(filterWord))
  })
  const dispatch = useDispatch()
  const addVote = ({ id, content }) => {
    dispatch(vote(id))
    dispatch(showNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5_000)
  }

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>

  )
}

export default AnecdoteList