import request from '../utils/request'

const API = '/service-trace/app-api/v1/tag'

function check(code, securityCode) {
    return request({
        url: API + '/check',
        method: 'post',
        data: {
            code: code,
            securityCode: securityCode
        }
    })
}

export default {
    check
}
