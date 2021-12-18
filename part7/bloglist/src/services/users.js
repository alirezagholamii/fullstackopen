import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/api/users'

const config = {};

const setToken = newToken => {
  const token = `bearer ${newToken}`
  config.headers = { Authorization: token }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}


/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, setToken }