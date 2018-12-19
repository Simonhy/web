<template>
    <div>
        <h2>Cart----购物车</h2>
         <ul>
             <li v-for="item of cartProducts" :key="item.id">
                 <span>{{item.title}}</span>---
                 <span>{{item.price}}</span>x
                 <span>{{item.quantity}}</span>
             </li>
         </ul>
         <p>totalPrice:${{cartTotalPrice}}</p>
         <p><button @click="checkout(cartProducts)" :disabled="!cartProducts.length">checkout</button></p>
         <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
    </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
export default {
    computed:{
        ...mapGetters('cart',['cartProducts','cartTotalPrice']),
        ...mapState('cart',['checkoutStatus'])
    },
    methods:{
      checkout(products){
        this.$store.dispatch('cart/checkOut',products)
      }
    }
}
</script>

<style scoped>

</style>