import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


// const response = await axios.post(baseUrl, newObject, config)

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, setToken, create }