import request from '../utils/request'

const API = '/service-trace/app-api/v1/template'

export function getCorp(id) {
    return request({
        url: API + '/corp/' + id,
        method: 'get'
    })
}

export function getProduct(id) {
    return request({
        url: API + '/product/' + id,
        method: 'get'
    })
}

export function getPlace(id) {
    return request({
        url: API + '/place/' + id,
        method: 'get'
    })
}

export function getPlot(id) {
    return request({
        url: API + '/plot/' + id,
        method: 'get'
    })
}
