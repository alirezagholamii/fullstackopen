import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'EDIT_BLOG':
      return state.map((item) => {
        if (item.id === action.data.id) {
          return action.data
        }
        return item
      }).sort((a, b) => (b.likes - a.likes))
    case 'REMOVE_BLOG':
      return state.filter(item => item.id !== action.id)
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

export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}


export const editBlog = (data) => {
  return async dispatch => {
    const editedBlog = await blogService.edit(data)
    dispatch({
      type: 'EDIT_BLOG',
      data: editedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        id: id,
      })
    } catch (e) {
      console.log('8====>', e);
    }
  }
}


export default reducer