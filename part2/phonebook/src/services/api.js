import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = ({ id }) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}



const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
const api = {
    getPersons, addPerson, deletePerson, updatePerson
}
export default api