import request from '../utils/request'

function getNumberData(data) {
    return request({
        url: '/chain/group/general',
        method: 'get',
        params: data
    })
}

function getTransactionList(data) {
    return request({
        url: '/chain/transaction/transList',
        method: 'get',
        params: data
    })
}

function getTransactionReceipt(transHash) {
    return request({
        url: '/chain/transaction/transactionReceipt',
        method: 'get',
        params: {
            transHash: transHash
        }
    })
}

function decode(transHash) {
    return request({
        url: '/chain/decode',
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
