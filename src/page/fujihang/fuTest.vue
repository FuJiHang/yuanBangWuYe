<!--
 * @Author: fujihang
 * @Date: 2020-06-29 14:10:15
 * @LastEditors: your name
 * @LastEditTime: 2020-06-30 18:14:16
 * @Description: 测试
--> 

<template>
  <div id="fuTest">
      <span class="" @click="toFN">
          ppp
      </span>
       <div class="" @click="toFNf">
          wwwww
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        toFN(){
            this.$router.push({path:'/fuIndex'})
        },
        toFNf(){
            this.$router.push({path:'/fuTestT'})

        }
    },
    mounted(){
        
    }
}
</script>

<style lang="less">
#fuTest{
  height: 100%;
  width: 100%;
//   background: green;
}
</style>