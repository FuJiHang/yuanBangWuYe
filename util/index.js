/*
 * @Author: fujihang
 * @Date: 2020-06-28 17:26:13
 * @LastEditors: your name
 * @LastEditTime: 2020-08-22 14:08:57
 * @Description: 请求封装
 */
import axios from 'axios'
import {
  Message
} from 'element-ui'
import Vue from 'vue';
import router from '../src/router/index'
window.errAxios = [] //请求失败的接口
const errNum = process.env.NODE_ENV == 'development' ? 1: 3 //请求失败的重连的次数
window.pinging = 0
// 加载中模板
var divLoading = document.createElement('div')
divLoading.setAttribute('class', 'el-loading-spinner fuLoadingDef')
divLoading.innerHTML = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><div style="color:#fff;font-size:20px;margin-left:10px;margin-top:20px;">加载中...</div>'
document.getElementsByTagName("body")[0].appendChild(divLoading);
var token=localStorage.getItem('token')


// 
var postFN = data => new Promise((resolve, reject) => {
  allApi({
    method: 'post',
    url: data.url,
    data: data.data,
  }).then(s => {
    resolve(s)
  })
})


// 
var getFN = data => new Promise((resolve, reject) => {
  allApi({
    method: 'get',
    url: data.url,
    params: data.data,
  }).then(s => {
    resolve(s)
  })
})

// 
var putFN = data => new Promise((resolve, reject) => {
  allApi({
    method: 'put',
    url: data.url,
    data: data.data,
  }).then(s => {
    resolve(s)
  })
})

// 
var deleteFN = data => new Promise((resolve, reject) => {
  allApi({
    method: 'delete',
    url: data.url,
    data: data.data,
  }).then(s => {
    resolve(s)
  })
})




// 总出口
var allApi = (data) => {
  return new Promise((resolve, reject) => {
    pinging == 0 ? divLoading.style.visibility = 'visible' : ''
    pinging++
    function forFN(data) {
      // data.url=+data.url
      token?data.headers={
        Authorization :token
      }:''
      axios(data).then(res => {
        pinging--
        pinging == 0 ? (divLoading.style.visibility = 'hidden') : ''
        res.data.status=='OK'&&res.data.data&&res.data.data.tokenVo?(token=res.data.data.tokenVo.token_type+' '+res.data.data.tokenVo.access_token,localStorage.setItem('token',res.data.data.tokenVo.token_type+' '+res.data.data.tokenVo.access_token)):''
        resolve(res)
      }).catch(err => {
        if (!navigator.onLine) {
          divLoading.style.visibility = 'hidden'
          Message.error({
            message: '您的设备无网络，请检查网络再刷新页面！',
            duration: 3000
          })
          return
        }
        let j = 0
        errAxios.forEach(c => {
          c.url == data.url ? (c.num++, c.num < errNum ? setTimeout(() => {
            forFN(data)
          }, 1500) : (errFN(err.response.status,err.response.data.message), pinging--, pinging == 0 ? (divLoading.style.visibility = 'hidden') : '')) : j++
        })
        j == errAxios.length && errNum ? (errAxios.push({
          url: data.url,
          num: 0
        }), setTimeout(() => {
          forFN(data)
        }, 1500)) : errNum == 0 ? divLoading.style.visibility = 'hidden' : '';
      })
    }
    forFN(data)
  })

}

//  请求错误提醒
function errFN(error,msg) {
  switch (error) {
    case 400:
      Message.error({
        message: msg?msg:'请求参数错误,请联系技术人员！',
        duration: 3000
      })
      break;
    case 401:
      Message.error({
        message: '您还未登陆,或登陆已过期！',
        duration: 3000
      })
      setTimeout(()=>{
        router.push({path:"/fuLogin"})
      },1450)
      break;
    case 403:
      Message.error({
        message: '禁止访问,您没有权限！',
        duration: 3000
      })
      break;
    case 404:
      Message.error({
        message: '找不到服务器,请联系技术人员！',
        duration: 3000
      })
      break;
    case 500:
      Message.error({
        message: '服务器内部错误,请联系技术人员！',
        duration: 3000
      })
      break;
    case 504:
      Message.error({
        message: '请求超时,请检查网路！',
        duration: 3000
      })
      break;
  }
}

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const install = () => {
  Vue.prototype.postFN = postFN
  Vue.prototype.getFN = getFN
  Vue.prototype.deleteFN = deleteFN
  Vue.prototype.putFN=putFN
  Vue.prototype.loadFN = function () {
    divLoading.style.visibility = 'visible'
  }
  Vue.prototype.noLoadFN = function () {
    divLoading.style.visibility = 'hidden'
  }

}
export default install
