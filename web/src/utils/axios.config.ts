import * as React from 'react'
import * as ReactDOM from 'react-dom';
import axios from 'axios'
import Loading from '../components/Loading/index'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 100000

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // 对请求错误做些什么，处理这个错误

        // 可以直接处理或者展示出去,toast show()
        console.warn(error);
        return Promise.reject(error);
    }
);

/**
 * 拦截响应response，并做一些错误处理
 */
axios.interceptors.response.use((response) => {
    const data = response.data
    console.info("response", response)
    return response.data
   
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求参数错误'
                break

            case 401:
                err.message = '未授权，请登录'
                break

            case 403:
                err.message = '跨域拒绝访问'
                break

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break

            case 408:
                err.message = '请求超时'
                break

            case 500:
                err.message = '服务器内部错误'
                break

            case 501:
                err.message = '服务未实现'
                break

            case 502:
                err.message = '网关错误'
                break

            case 503:
                err.message = '服务不可用'
                break

            case 504:
                err.message = '网关超时'
                break

            case 505:
                err.message = 'HTTP版本不受支持'
                break

            default:
        }
    }
    return Promise.reject(err)
})

export default axios;