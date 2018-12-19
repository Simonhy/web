import shop from '../../api/shop'
const state = {
    //所有的产品列表
    all: []
}
const getters = {

}
const mutations = {
    //更改数据状态
    setProducts(state, payload) {
        state.all = payload
    },
    //减少一条数据
    decrementProductInventory(state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

const actions = {
    getAllProducts({ commit }) {
        //异步获取数据
        shop.getProducts(products => {
            commit('setProducts', products)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}