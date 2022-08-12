<template>
<div id="home">
  <nav-bar class="home-nav">
    <template v-slot:center>
      <div>购物街</div>
    </template>
  </nav-bar>
  <tab-control v-show="isTabFixed" class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"/>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
    <goods-list :goods="goods[currentType].list" :imageLoad="imageLoad"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isShow"/>
</div>
</template>

<script>
import {getHomeMultidata,getHomeGoods} from "@/network/home";
import NavBar from "@/components/common/navigationbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0 , list: []},
        'new':{page: 0 , list: []},
        'sell':{page: 0 , list: []}
      },
      currentType:'pop',
      isShow:false,
      refresh1:'',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    //监听图片加载完成
    // this.$bus.$on('itemImageLoad',() => {
    //   this.$refs.scroll.refresh()
    // })
  },
  mounted() {


    const that = this
    that.refresh1 =  this.debounce(this.imageLoad1,200)
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {

    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods:{
    /*网络请求*/
    getHomeMultidata(){
      //1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      //2.请求商品数据
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    /*事件监听*/
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
              break
        case 1:
          this.currentType = 'new'
              break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //1.判断backTop是否显示
      // console.log(position);
      this.isShow = -position.y > 1000
      //2.决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    imageLoad1(){
      this.$refs.scroll.refresh()
    },
    imageLoad(){
      this.refresh1()
    },
    /*防抖函数*/
    debounce(func,delay){
      let timer = null
      return function (...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        },delay)
      }
    },
    swiperImageLoad(){
      //所有的组件都有一个属性$el 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 10;*/
}
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
/*.tab-control{*/
/*  position: sticky;*/
/*  top: 44px;*/
/*}*/
/*.content{*/
/*  height: calc(100% - 50px);*/
/*  overflow: hidden;*/
/*  !*margin-bottom: 44px;*!*/
/*}*/
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
