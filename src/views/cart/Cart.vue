<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>

    <cart-list :cart-list="cartList"/>

    <bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navigationbar/NavBar";
import store from "@/store";
import CartList from "@/views/cart/childComps/CartList";
import BottomBar from "@/views/cart/childComps/BottomBar";
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    BottomBar
  },
  computed:{
    cartLength(){
      return store.state.cartShop.length
    },
    cartList() {
      return store.state.cartShop
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
.cart{
  height: 100vh;
  position: relative;
}

</style>
