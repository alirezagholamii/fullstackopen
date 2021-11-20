import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const result = await anecdoteService.createNew(content)
    console.log(result);
    dispatch(createAnecdote(result))
    dispatch(showNotification(`new anecdote '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5_000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}
export default AnecdoteForm