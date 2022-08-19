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
            state.cartShop.push(payload)
        }
    },
    actions: {
        addCart(context,payload){
            // let oldProduct = null;
            // for (let item of state.cartList){
            //     if(item.iid === payload.iid){
            //         oldProduct = item
            //     }
            // }
            let oldProduct = context.state.cartShop.find(function (item){
                return item.iid === payload.iid
            })
            if (oldProduct){
                // oldProduct.count +=1
                context.commit('AddCounter',oldProduct)
            } else {
                payload.count = 1
                // context.state.cartShop.push(payload)
                context.commit('AddToCart',payload)
            }
        }
    },
    modules: {
    }
})
export default store