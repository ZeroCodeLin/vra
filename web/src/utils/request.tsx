import * as React from 'react'
import * as ReactDOM from 'react-dom';
import axios from './axios.config'
import Loading from '../components/Loading/index'

interface Loading {
    text?: string,
    size?: "small" | "default" | "large" | undefined,
}

type Method = 'get' | 'delete' | 'post' | 'put' | 'patch';
  
  
class Request {
    private service(method: Method, url: string, param: any, loading?: Loading) {
        return new Promise((resolve, reject) => {
            if (loading) {
                ReactDOM.render(
                    <Loading spinning={true} tip="正在加载，请稍后。。。" />,
                    document.getElementById('loading')
                )
            }
            axios[method](url, param).then((data: any) => {
                if (loading) {
                    ReactDOM.render(
                        <Loading spinning={false} />,
                        document.getElementById('loading')
                    )
                    resolve(data);
                }
                resolve(data);
            }).catch(err => {
                if (loading) {
                    ReactDOM.render(
                        <Loading spinning={false} />,
                        document.getElementById('loading')
                    )
                }
                reject(err);
            })
        })
    }
    get(url: string, args?: any, loading?: Loading) {
        const params = {
            params: {
                ...args
            }
        }
        return this.service('get', url, params, loading);
    }
    post(url: string, params: any, loading?: Loading) {
        return this.service('post', url, params, loading);
    }
}

export default new Request();