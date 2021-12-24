import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3001/api/blogs'


const config = {};

const setToken = newToken => {
  const token = `bearer ${newToken}`
  config.headers = { Authorization: token }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (data) => {
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const edit = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blog, config)
  return response.data
}

const remove = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config);
  return response
}

const addComment = async (id, comment) => {
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, comment, config);
  return response
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, setToken, create, edit, remove, addComment }