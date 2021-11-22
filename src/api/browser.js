import request from '../utils/request'

const API = '/service-eth/app-api/v1/browser'

function getNumberData(data) {
    return request({
        url: API + '/group/general',
        method: 'get',
        params: data
    })
}

function getTransactionList(data) {
    return request({
        url: API + '/transaction/transList',
        method: 'get',
        params: data
    })
}

function getTransactionReceipt(transHash) {
    return request({
        url: API + '/transaction/transactionReceipt',
        method: 'get',
        params: {
            transHash: transHash
        }
    })
}

function decode(transHash) {
    return request({
        url: API + '/decode',
        method: 'get',
        params: {
            transHash: transHash
        }
    })
}

export default {
    getNumberData,
    getTransactionList,
    getTransactionReceipt,
    decode
}
