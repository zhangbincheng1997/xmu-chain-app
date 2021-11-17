import request from '../utils/request'

function getCorp(id) {
    return request({
        url: '/template/corp/' + id,
        method: 'get'
    })
}

function getProduct(id) {
    return request({
        url: '/template/product/' + id,
        method: 'get'
    })
}

function getPlace(id) {
    return request({
        url: '/template/place/' + id,
        method: 'get'
    })
}

function getPlot(id) {
    return request({
        url: '/template/plot/' + id,
        method: 'get'
    })
}

export default {
    getCorp,
    getProduct,
    getPlace,
    getPlot
}
