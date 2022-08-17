<template>
  <swiper class="swiper-item">
    <swiper-item  v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper";
export default {
  name: "DetailSwiper",
  props:{
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.swiper-item{
  overflow: hidden;
}
.slide img {
  width: 100%;
  height: 100%;
}
</style>