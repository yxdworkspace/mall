<template>
<div class="cart-list">
  <scroll class="content">
  <cart-list-item v-for="item in cartShopList" :prpduct="item"/>
  </scroll>
</div>
</template>
<script>
import Scroll from "@/components/common/scroll/Scroll";
import store from "@/store";
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  computed:{
    cartShopList(){
      return store.state.cartShop
    }
  },
  components:{
    Scroll,
    CartListItem
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>