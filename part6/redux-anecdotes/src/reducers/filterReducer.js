const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data.value

    default:
      return state
  }
}

export const changeFilter = (value) => {
  return {
    type: 'CHANGE_FILTER',
    data: {
      value,
    }
  }
}

export default reducer