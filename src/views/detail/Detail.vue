<template>
  <div id="detail">
  <detail-nav-bar class="detail-nav"/>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo"/>
  </scroll>
  </div>
</template>

<script>
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import {getDetail,Goods,Shop,GoodsParam} from "@/network/detail";
import NavBar from "@/components/common/navigationbar/NavBar";
import router from "@/router";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
export default {
  name: "Detail",
  methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
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
    DetailParamInfo
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{}
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
    })
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
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>