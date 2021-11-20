import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  try {
    const response = await axios.put(
      `${baseUrl}/${anecdote.id}`,
      { ...anecdote, votes: anecdote.votes + 1 }
    )
    return response.data
  } catch (e) {
    console.log(e);
  }
}

const service = {
  getAll,
  createNew,
  vote
}
export default service