import request from '../utils/request'

const API = '/service-admin/app-api/v1'

export function getCompanyId(id) {
    return request({
        url: API + '/company/' + id,
        method: 'get'
    })
}
