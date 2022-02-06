import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.then(response => response.data)
}

const remove = (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`, getConfig())
  return request.then(response => response.data)
}

const newComment = (id,comment) => {
  console.log ('blogs in service',comment)
  const request = axios.post(`${baseUrl}/${id}/comments`,comment)
  console.log('Request',request)
  return request.then(response => response.data)
}

export default { getAll,getBlog, create, update, remove , newComment }