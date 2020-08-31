import toast from './toast'
//把toast加商品到购物车弹出对话框的功能，以插件方式封装
const obj = {}
obj.install = function(Vue) {

    //获取不到 document.body.appendChild(toast.$el)
    //用一般方法
    //1创建组件构造器
    const toastcont = Vue.extend(toast)
        //2根据new的方式，创建一个组件对象
    const toasts = new toastcont()
        //3将组件对象，手动挂载到某一个元素,创建一个div
    toasts.$mount(document.createElement('div'))
        //4$el对应就是div
    document.body.appendChild(toasts.$el)
    Vue.prototype.$toasts = toasts
}
export default obj