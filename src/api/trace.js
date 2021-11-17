import request from '../utils/request'

function getAdmin(code) {
    return request({
        url: '/trace/admin/' + code,
        method: 'get'
    })
}

function listGrow(code) {
    return request({
        url: '/trace/grow/list/' + code,
        method: 'get'
    })
}

function listFarm(code) {
    return request({
        url: '/trace/farm/list/' + code,
        method: 'get'
    })
}

function listProcess(code) {
    return request({
        url: '/trace/process/list/' + code,
        method: 'get'
    })
}

export default {
    getAdmin,
    listGrow,
    listFarm,
    listProcess
}
