import shop from '../../api/shop'
const state = {
    //购物车的数据
    cartItem: [],
    checkoutStatus: null
}
const getters = {
    //根据购物车里面的id获取物品展示
    cartProducts: (state, getters, rootState) => {
        return state.cartItem.map(({ id, quantity }) => {
            const product = rootState.products.all.find(product => product.id === id)
            return {
                title: product.title,
                price: product.price,
                quantity
            }
        })
    },
    //获得总价
    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}
const mutations = {
    //想购物车添加数据
    pushProductCart(state, { id }) {
        state.cartItem.push({
            id,
            quantity: 1
        })
    },
    //数量加1
    incrementItemQuantity(state, { id }) {
        const cartItem = state.cartItem.find(item => item.id === id)
        cartItem.quantity++
    },

    setCheckStatus(state, status) {
        state.checkoutStatus = status
    },

    setCartItems(state, { items }) {
        state.cartItem = items
    }
}

const actions = {
    //购买商品
    addProductToCart({ state, commit }, product) {
        if (product.inventory > 0) {
            //如果购物车里面有该条数据,让数量加一
            const currentItem = state.cartItem.find(item => item.id === product.id)
            if (currentItem) {
                commit('incrementItemQuantity', currentItem)
            } else {
                //如果购物车里面没有该条数据,添加到购物车
                // console.log(product.id)
                commit('pushProductCart', {
                    id: product.id
                })
            }
            //从原数据中移除 commit('products/decrementProductInventory', { id: product.id }, { root: true })
            commit('products/decrementProductInventory', { id: product.id }, { root: true })
        } else {
            console.log('没有库存了')
        }
    },
    //结算数据,清空购物车
    checkOut({ state, commit }, products) {
        const savedCartItems = [...state.cartItem]
            //更改结算按钮的状态
        commit('setCheckStatus', null)
            //清空购物车
        commit('setCartItems', { items: [] })
            //购买商品
        shop.buyProducts(
            products,
            () => commit('setCheckStatus', 'successful'), //成功
            () => {
                commit('setCheckStatus', 'failed')
                    // rollback to the cart saved before sending the request
                commit('setCartItems', { items: savedCartItems })
            }
        )
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}