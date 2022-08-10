<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  mounted() {
    this.scroll = new BScroll(".wrapper",{
      probeType:3,
      observeDOM:true,
      click:true
    })
    // this.scroll(0,0)
  },
  data(){
    return {
      scroll:null
    }
  },
  methods:{
    scrollTo(x,y, time =300){
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style scoped>

</style>