import request from '../utils/request'

const API = '/service-trace/app-api/v1/trace'

export function getInfoByCode(code) {
    return request({
        url: API + '/info/' + code,
        method: 'get'
    })
}

export function getProductById(id) {
    return request({
        url: API + '/product/' + id,
        method: 'get'
    })
}

export function getPlaceById(id) {
    return request({
        url: API + '/place/' + id,
        method: 'get'
    })
}

export function getPlotById(id) {
    return request({
        url: API + '/plot/' + id,
        method: 'get'
    })
}

export function listGrowByCode(code) {
    return request({
        url: API + '/op/grow/list/' + code,
        method: 'get'
    })
}

export function listFarmByCode(code) {
    return request({
        url: API + '/op/farm/list/' + code,
        method: 'get'
    })
}

export function listProcessByCode(code) {
    return request({
        url: API + '/op/process/list/' + code,
        method: 'get'
    })
}
