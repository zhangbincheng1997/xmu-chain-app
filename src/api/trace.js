import request from '../utils/request'

const API = '/service-trace/app-api/v1/trace'

export function trace(companyId, batchNo, code) {
    return request({
        url: API,
        method: 'get',
        params: {
            companyId: companyId,
            batchNo: batchNo,
            code: code
        }
    })
}
