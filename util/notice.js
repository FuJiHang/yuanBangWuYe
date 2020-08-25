/*
 * @Author: fujihang
 * @Date: 2020-06-29 11:59:25
 * @LastEditors: your name
 * @LastEditTime: 2020-08-20 14:33:01
 * @Description: 通知类型
 */
var win = window
import {
  Message
} from 'element-ui'
import Vue from 'vue';
var eFN = function (msg) {
  Message.error(msg)
}
var oFN = function (msg) {
    Message({
    message: msg,
    type: 'success'
  });
}



win.nuFN = (data, name) => {
  let s = false
  for (let i = 0; i < data.length; i++) {
    if (!(data[i][name].toString().trim())) s = true
  }
  return s
}


const install = () => {
  Vue.prototype.eFN = eFN,
  Vue.prototype.oFN = oFN
  


}
export default install
