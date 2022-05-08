import request from '../utils/request'

const API = '/service-trace/app-api/v1/trace'

export function scan(batchId, code) {
  return request({
    url: API + '/scan',
    method: 'get',
    params: {
      batchId: batchId,
      code: code
    }
  })
}

export function detail(batchId) {
  return request({
    url: API + '/detail',
    method: 'get',
    params: {
      batchId: batchId
    }
  })
}
