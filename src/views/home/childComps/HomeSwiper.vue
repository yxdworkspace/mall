<template>
  <swiper>
    <swiper-item v-for="items in banners">
      <a :href="items.link">
        <img :src="items.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  }
}
</script>

<style scoped>
.slide img {
  width: 100%;
}
</style>