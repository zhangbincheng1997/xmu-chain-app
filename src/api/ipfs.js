import request from '../utils/request'

const API = '/service-evidence/api/v1/ipfs'

export function gateway() {
  return request({
    url: API + '/gateway',
    method: 'get'
  })
}
