import Vue from 'vue'
import Router from 'vue-router'

//解决路由重复（也有可能是vue-router版本问题）报错,但还是无法解决
const originalPush = Router.prototype.push
Router.prototype.push == function push(location) {
    return originalPush.call(this.location).catch(err => err)
}
const home = () =>
    import ('../views/home/home')
const by = () =>
    import ('../views/cart/by')
const fen = () =>
    import ('../views/category/fen')
const profile = () =>
    import ('../views/profile/profile')
const detall = () =>
    import ('../views/detall/detall')
    //传入插件
Vue.use(Router)

//导出
const router = new Router({
    //配置路由和组件之间应用关系:映射
    routes: [{
            path: '',
            redirect: '/home'

        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/fen',
            component: fen
        },
        {
            path: '/by',
            component: by
        },
        {
            path: '/profile',
            component: profile
        },
        {
            path: '/detall/:iid',
            component: detall
        },


    ],
    //将网页路径显示由哈希值改为HTML5的history
    mode: 'history',


})

export default router