import request from '../utils/request'

const API = '/service-admin/app-api/v1'

export function getUser(address) {
    return request({
        url: API + '/user/' + address,
        method: 'get'
    })
}

export function getCompany(id) {
    return request({
        url: API + '/company/' + id,
        method: 'get'
    })
}
