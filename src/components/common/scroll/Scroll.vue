<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      observeDOM:true,
      click:true,
      pullUpLoad: this.pullUpLoad,
    })
    // this.scroll(0,0)
    //2.监听滚动的位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })
    //3.监听滚动的位置
    this.scroll.on('pullingUp',() => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
  },
  data(){
    return {
      scroll:null
    }
  },
  methods:{
    scrollTo(x,y, time =300){
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
}
</script>

<style scoped>

</style>