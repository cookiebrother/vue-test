import axios from '../plugins/http'

export function api_login(username, password) {
  return axios.post('/admin/login', {
    username,
    password
  })
}

export function api_logout() {
  return axios.post('/admin/logout')
}

export function api_info() {
  return axios.get('/admin/info')
}
