import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://118.89.176.28:8080'
axios.defaults.timeout = 15000

axios.interceptors.request.use(
  function(config) {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    console.log('request')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    console.log('response')
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default axios
