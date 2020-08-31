import Vue from 'vue'
import Vuex from 'vuex'

import { ADD_COUNTER, ADD_CART } from './type'
import getters from './getters'
Vue.use(Vuex)
const state = { cartlist: [] }
const store = new Vuex.Store({
        state,
        getters,
        mutations: {
            [ADD_COUNTER](state, payload) {
                payload.count++
            },
            [ADD_CART](state, payload) {
                payload.checked = true
                state.cartlist.push(payload)
            }
            /*addcart(state, payload) {
                //新的商品添加payload
                // let oldproduct = null
                /*for (let item of state.cartlist) {
                    if (item.iid === product.iid) {
                        oldproduct = item
                    }
                }
                //简单方法实现商品查找数组方法find  
                let oldproduct = state.cartlist.find(item => item.iid === payload.iid)
                    //判断oldproduct,是否再次将同样的商品加到购物车
                if (oldproduct) {
                    oldproduct.count += 1
                } else {
                    payload.count = 1
                    state.cartlist.push(payload)
                }

            }*/
        },
        actions: {
            addcart(context, payload) {
                return new Promise((resolve, reject) => {
                    //新的商品添加payload
                    // let oldproduct = null
                    /*for (let item of state.cartlist) {
                        if (item.iid === product.iid) {
                            oldproduct = item
                        }
                    }*/
                    //简单方法实现商品查找数组方法find  
                    let oldproduct = context.state.cartlist.find(item => item.iid === payload.iid)
                        //判断oldproduct,是否再次将同样的商品加到购物车
                    if (oldproduct) {
                        // oldproduct.count += 1
                        context.commit(ADD_COUNTER, oldproduct)
                        resolve('商品数量+1')
                    } else {
                        payload.count = 1
                            //  context.state.cartlist.push(payload)
                        context.commit(ADD_CART, payload)
                        resolve('成功添加新的商品')
                    }
                })

            }
        }
    })
    //导出挂载到实例
export default store