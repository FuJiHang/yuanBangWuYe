<!--
 * @Author: fujihang
 * @Date: 2020-06-29 14:17:30
 * @LastEditors: your name
 * @LastEditTime: 2020-07-01 10:14:14
 * @Description: 
--> 

<template>
  <div>
    {{num/5}}
    <div>{{num2/10}}</div>
    <loadCom name="asdasd" @openFN="sssFN"></loadCom>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "gxw",
      sex: "男",
      num: 10,
      num2: "100"
    };
  },
  mounted(){
    //   this.loadFN()
  },
  methods:{
      sssFN(){
          console.log('22222222222');
      }
  }
};
</script>

<style lang="less">
</style>