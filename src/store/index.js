import { createStore } from 'vuex'

const store = createStore({
    state: {
            cartShop:[]
    },
    mutations: {
        AddCounter(state,payload){
            payload.count++
        },
        AddToCart(state,payload){
            payload.checked = true
            state.cartShop.push(payload)
        }
    },
    actions: {
        addCart(context,payload){
            return new Promise((resolve,reject) => {
                let oldProduct = context.state.cartShop.find(function (item){
                    return item.iid === payload.iid
                })
                if (oldProduct){
                    // oldProduct.count +=1
                    context.commit('AddCounter',oldProduct)
                    resolve('当前商品数量+1')
                } else {
                    payload.count = 1
                    // context.state.cartShop.push(payload)
                    context.commit('AddToCart',payload)
                    resolve('添加了新的商品')
                }
            })
            // let oldProduct = null;
            // for (let item of state.cartList){
            //     if(item.iid === payload.iid){
            //         oldProduct = item
            //     }
            // }
        }
    },
    modules: {
    }
})
export default store