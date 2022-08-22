<template>
<div>
  <scroll class="content" ref="scroll">
  <cart-list-item v-for="item in cartShopList" :product="item" />
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
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.content{
  position: absolute;
  top: 44px;
  bottom: 93px;
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
}

</style>