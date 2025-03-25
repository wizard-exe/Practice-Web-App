import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject).catch(() => {console.log('fail')})
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject, {
    headers: { 'Content-Type': 'application/json' },
    params: { runValidators: true }
  }).then(response => response.data)
}

const deleteP = (id) => {
  console.log(id)
  const request = axios.delete(`${baseUrl}/${id}`).catch(() => {console.log('fail')})
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteP,
}