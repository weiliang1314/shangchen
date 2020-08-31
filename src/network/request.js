//axios模块封装
import axios from 'axios'
//简单封装
export function request(config) {

    //创建实例
    const instance = axios.create({
            baseURL: 'http://',
            timeout: 5000
        })
        //拦截器
        //发送请求成功与失败
    instance.interceptors.request.use(config => {
            //若不返回，后面拿不到config
            //使用拦截器的场景：信息不符合服务器要求，发送请求时要在界面中显示请求图标，一些网络请求必须请携带一些特殊信息
            // console.log(config)
            return config
        }, err => {
            console.log(err)
        })
        //响应数据成功与失败:
    instance.interceptors.response.use(
            res => {
                //console.log(res)
                //拦截后要返回，不然后面接收不到
                return res.data
            },
            err => {
                console.log(err)
            }
        )
        //发送请求

    return instance(config)


}
