import axios from 'axios'
import { Toast } from 'vant'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000
})

// TODO
// request interceptor
service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MjAyMTAzMTQwMH0.6N8kT2kht37mD4DAEXaIrqUP_yJMXvdgXxf25RejGRscF_CW3CICj0LCeTkrogDsMphvDr6B73ankKkuffaOhw'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      // for debug
      Toast.fail(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
