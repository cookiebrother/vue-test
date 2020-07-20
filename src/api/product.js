import axios from '../plugins/http.js'

export function api_productList(params) {
  return axios({
    url: '/product/list',
    method: 'get',
    params: params
  })
}

export function api_updateProductStatus(type, params) {
  console.log('api_updateProductStatus', params)
  return axios({
    url: `/product/update/${type}`,
    method: 'post',
    data: params
  })
}
