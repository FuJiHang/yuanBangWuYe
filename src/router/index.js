import Vue from 'vue'
import Router from 'vue-router'
import fujihang from './fujihang'


import {Message} from 'element-ui'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const router = new Router({
  routes: [

    ...fujihang
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

let a=['fuIndex','fuTestT','fuLogin']
// router.beforeEach((to, from, next) => {
//   let num=0
//   for(let i=0,len=a.length;i<len;i++){
//     a[i]==to.name||to.name==''?next(errAxios = []):(num++,num==a.length?Message('抱歉，您权限不足！'):'')
//   }
// })


export default router
