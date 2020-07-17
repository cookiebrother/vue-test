import axios from '../plugins/http.js'

export function api_productList(params) {
  return axios({
    url: '/product/list',
    method: 'get',
    params: params
  })
}
