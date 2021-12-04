import request from '../utils/request'

const API = '/service-trace/app-api/v1/trace'

export function getInfoByCode(code) {
    return request({
        url: API + '/info/' + code,
        method: 'get'
    })
}

export function listGrowByCode(code) {
    return request({
        url: API + '/grow/list/' + code,
        method: 'get'
    })
}

export function listFarmByCode(code) {
    return request({
        url: API + '/farm/list/' + code,
        method: 'get'
    })
}

export function listProcessByCode(code) {
    return request({
        url: API + '/process/list/' + code,
        method: 'get'
    })
}
