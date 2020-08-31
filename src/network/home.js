//调用封装的模块
import { request } from './request'
export function homedata() {
    return request({
        url: '/home/multidata'

    })
}
//首页商品数据
export function getgoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}