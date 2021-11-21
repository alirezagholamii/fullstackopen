let timeoutID;

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
export const showNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
      }
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}


export default reducer