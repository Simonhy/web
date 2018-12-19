<template>
    <div>
        <h2>Product-list---产品列表</h2>
        <ul>
            <li v-for="product in products" v-bind:key="product.id">
                <span>{{product.title}}</span>-----
                <span>${{product.price}}</span> x
                <span>{{product.inventory}}</span>
                <br>
                <button
                    :disabled="!product.inventory"
                    @click="addProductToCart(product)">
                    Add to cart
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
    created(){
        //渲染完成组建后，进行获取数据
        this.$store.dispatch('products/getAllProducts')
    },
    computed:{
        //得到数据,进行展示
        ...mapState('products',{
            products:'all'
        })
    },
    methods:{
       ...mapActions('cart',[
           'addProductToCart'
       ])
    }
}
</script>

<style scoped>

</style>

