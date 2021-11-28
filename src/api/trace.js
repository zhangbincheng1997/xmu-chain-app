import request from '../utils/request'

const API = '/service-trace/app-api/v1/trace'

export function getAdmin(code) {
    return request({
        url: API + '/admin/' + code,
        method: 'get'
    })
}

export function listGrow(code) {
    return request({
        url: API + '/grow/list/' + code,
        method: 'get'
    })
}

export function listFarm(code) {
    return request({
        url: API + '/farm/list/' + code,
        method: 'get'
    })
}

export function listProcess(code) {
    return request({
        url: API + '/process/list/' + code,
        method: 'get'
    })
}
