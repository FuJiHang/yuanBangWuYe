/*
 * @Author: fujihang
 * @Date: 2020-06-29 15:10:33
 * @LastEditors: your name
 * @LastEditTime: 2020-08-20 10:21:48
 * @Description: 
 */


import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  state: {
    //存放的键值对就是所要管理的状态
    refarTo: ''
  },
  mutations:{
    toFN(state,to){
      state.refarTo=to
      console.log(state);
    }
  }
})

export default store
