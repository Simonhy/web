<template>
  <div id="app">
      <product></product>
      <hr/>
      <cart></cart>
  </div>
</template>

<script>
import product from "./components/product-list";
import cart from "./components/cart";

export default {
  name: 'app',
  components: {
    product,
    cart
  }
}
</script>

<style>

</style>
