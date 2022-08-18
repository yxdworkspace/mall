<template>
<div>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div @click="titleClick(index)" :class="{active:index === currentIndex}" class="title-item" v-for="(item,index) in titles">{{item}}</div>
      </div>
    </template>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "@/components/common/navigationbar/NavBar";
import router from "@/router";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-tint);
}
.back img{
  margin-top: 10px;
}
</style>