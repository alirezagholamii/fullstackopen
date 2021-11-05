import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { login }