<template>
<div id="home">
  <nav-bar class="home-nav">
    <template v-slot:center>
      <div>购物街</div>
    </template>
  </nav-bar>
  <home-swiper :banners="banners"/>
</div>
</template>

<script>
import {getHomeMultidata} from "@/network/home";
import NavBar from "@/components/common/navigationbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })

  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}


</style>
