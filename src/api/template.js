import request from '../utils/request'

const API = '/service-trace/app-api/v1/template'

function getCorp(id) {
    return request({
        url: API + '/corp/' + id,
        method: 'get'
    })
}

function getProduct(id) {
    return request({
        url: API + '/product/' + id,
        method: 'get'
    })
}

function getPlace(id) {
    return request({
        url: API + '/place/' + id,
        method: 'get'
    })
}

function getPlot(id) {
    return request({
        url: API + '/plot/' + id,
        method: 'get'
    })
}

export default {
    getCorp,
    getProduct,
    getPlace,
    getPlot
}
