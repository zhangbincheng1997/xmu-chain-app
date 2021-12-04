import request from '../utils/request'

const API = '/service-trace/app-api/v1/template'

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
