<!--
 * @Author: fujihang
 * @Date: 2020-06-30 17:46:08
 * @LastEditors: your name
 * @LastEditTime: 2020-07-01 10:13:34
 * @Description: 编写组件
--> 

<template>
  <div class="loading-box" @click="OpenFN">{{name?name:'Loading'}}...</div>
</template>

<script>
export default {
  props:['name'],
  data(){
    return{

    }
  },
  methods:{
    OpenFN(){
      this.$emit('openFN')
    },
    
  }
};
</script>

<style>
.loading-box{
    height: 200px;
    width: 200px;
    background: red;
    margin: auto;
    left: 0;right: 0;top: 0;bottom: 0;
}


</style>