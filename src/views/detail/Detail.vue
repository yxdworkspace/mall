<template>
  <div id="detail">
  <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import {getDetail,Goods,Shop} from "@/network/detail";
import NavBar from "@/components/common/navigationbar/NavBar";
import router from "@/router";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
export default {
  name: "Detail",
  methods:{

  },
  components:{
    NavBar,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{}
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = router.currentRoute.value.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      this.topImages = res.result.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
    })
  }
}
</script>

<style scoped>

</style>