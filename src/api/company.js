import request from '../utils/request'

const API = '/service-admin/app-api/v1/company'

function get(id) {
    return request({
        url: API + '/' + id,
        method: 'get'
    })
}

export default {
    get
}
