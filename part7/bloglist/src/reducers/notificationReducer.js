let timeoutID;

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.data.message,
        messageType: action.data.messageType
      }
    case 'CLEAR_NOTIFICATION':
      return null

    default:
      return state
  }
}
export const showNotification = (message, messageType, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        messageType
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