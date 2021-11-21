import request from '../utils/request'

const API = '/service-trace/app-api/v1/trace'

function getAdmin(code) {
    return request({
        url: API + '/admin/' + code,
        method: 'get'
    })
}

function listGrow(code) {
    return request({
        url: API + '/grow/list/' + code,
        method: 'get'
    })
}

function listFarm(code) {
    return request({
        url: API + '/farm/list/' + code,
        method: 'get'
    })
}

function listProcess(code) {
    return request({
        url: API + '/process/list/' + code,
        method: 'get'
    })
}

export default {
    getAdmin,
    listGrow,
    listFarm,
    listProcess
}
