import request from '../utils/request'

function check(code, securityCode) {
    return request({
        url: '/tag/check',
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
