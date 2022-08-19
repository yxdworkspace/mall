<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>

    <cart-list/>


  </div>
</template>

<script>
import NavBar from "@/components/common/navigationbar/NavBar";
import store from "@/store";
import CartList from "@/views/cart/childComps/CartList";
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList
  },
  computed:{
    cartLength(){
      return store.state.cartShop.length
    }
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: white;
  /*font-weight: 700;*/
}
</style>
