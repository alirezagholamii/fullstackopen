import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    // case 'NEW_VOTE':
    //   return state.map((item) => {
    //     if (item.id === action.data.id) {
    //       return { ...action.data }
    //     }
    //     return item
    //   }).sort((a, b) => (b.votes - a.votes))
    case 'NEW_BLOG':
      return [...state, {
        ...action.data
      }]
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => (b.likes - a.likes))
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

// export const createAnecdote = (data) => {
//   return async dispatch => {
//     const newAnecdote = await anecdoteService.createNew(data)
//     dispatch({
//       type: 'NEW_ANECDOTE',
//       data: newAnecdote,
//     })
//   }
// }

// export const vote = (anecdote) => {
//   return async dispatch => {
//     const result = await anecdoteService.vote(anecdote)
//     dispatch({
//       type: 'NEW_VOTE',
//       data: result,
//     })
//   }
// }

export default reducer