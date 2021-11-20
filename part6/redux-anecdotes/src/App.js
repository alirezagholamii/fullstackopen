import React, { useEffect } from 'react'
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />


    </div>
  )
}

export default App