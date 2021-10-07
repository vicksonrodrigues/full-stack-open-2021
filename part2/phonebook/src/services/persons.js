import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl) //get(url)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject) //post(url,data)
    return request.then(response => response.data) //response is returned
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`) //delete(url)
    return request.then(response => response.data) //response is returned
  }


export default { getAll, create, remove, update}