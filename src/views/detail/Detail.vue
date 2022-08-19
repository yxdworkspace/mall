<template>
  <div id="detail">
  <detail-nav-bar ref="nav" @titleClick="titleClick" class="detail-nav"/>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <ul>
      <li v-for="item in cartList">{{item}}</li>
    </ul>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/detail";
import NavBar from "@/components/common/navigationbar/NavBar";
import router from "@/router";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";
import {debounce} from "@/common/utils";
import store from "@/store";

export default {
  name: "Detail",
  methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i =0 ; i < length;i++){
          // if(positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]){
          //
          // }
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))) {
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
          }
          // if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          this.isShow = -position.y > 1000
        }
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0)
      },
      addToCart(){
        //1.获取购物车需要的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // store.commit('addCart',product)
        store.dispatch('addCart',product)
      }

  },
  computed:{
    cartList(){
      return store.state.cartShop
    }
  },
  components:{
    NavBar,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      isShow:false,
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = router.currentRoute.value.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo =data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // this.themeTopYs.push(Number.MAX_VALUE)
      })
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {

  },
  updated() {

  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>