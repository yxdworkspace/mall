<template>
<div class="tab-bar-item" @click="itemClick">
  <div v-if="!isActive">
    <slot name="item-icon"></slot>
  </div>
  <div v-else>
    <slot name="item-icon-active"></slot>
  </div>
  <div :style="activeStyle">
    <slot name="item-text"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'deeppink'
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
      //indexOf等于-1等于没有找到
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

</style>
