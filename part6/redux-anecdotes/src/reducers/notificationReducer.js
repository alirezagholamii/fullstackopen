

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.message
    case 'CLEAR_NOTIFICATION':
      return null

    default:
      return state
  }
}
export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message,
    }
  }
}
export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default reducer