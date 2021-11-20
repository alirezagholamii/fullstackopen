

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const vote = (id) => {
  return {
    type: 'NEW_VOTE',
    data: { id }
  }
}

export default reducer