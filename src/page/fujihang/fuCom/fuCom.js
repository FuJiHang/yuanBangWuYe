/*
 * @Author: fujihang
 * @Date: 2020-06-30 17:50:27
 * @LastEditors: your name
 * @LastEditTime: 2020-06-30 17:52:16
 * @Description: 
 */


import LoadCom from './fuCom.vue'

const loadCom = {
  install:function(Vue){
      Vue.component('loadCom',LoadCom)
  }
}


export default loadCom