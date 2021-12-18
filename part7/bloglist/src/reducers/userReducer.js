import loginService from "../services/login"
import blogService from "../services/blogs"
import usersService from "../services/blogs"
import { showNotification } from "./notificationReducer"

const initailState = window.localStorage.getItem('loggedUser') ?
  JSON.parse(window.localStorage.getItem('loggedUser')) : null;

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (obj) => {
  return async dispatch => {
    try {
      const user = await loginService.login(obj)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      usersService.setToken(user.token)
    } catch (e) {
      console.log('user', e);
      dispatch(showNotification(e.response.data.error, 'error', 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.clear()
    window.location.reload()
    dispatch({
      type: 'LOGOUT',
    })
  }

}

export default reducer