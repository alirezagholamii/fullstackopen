import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_VOTE':
      return state.map((item) => {
        if (item.id === action.data.id) {
          return { ...item, votes: item.votes + 1 }
        }
        return item
      }).sort((a, b) => (b.votes - a.votes))
    case 'NEW_ANECDOTE':
      return [...state, {
        ...action.data
      }]
    default:
      return state
  }



}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const vote = (id) => {
  return {
    type: 'NEW_VOTE',
    data: { id }
  }
}

export default reducer