<!--
 * @Author: fujihang
 * @Date: 2020-07-01 17:32:21
 * @LastEditors: your name
 * @LastEditTime: 2020-08-17 11:01:25
 * @Description: 登录注册
--> 

<template>
  <div id="fuLogin">
    <!--  -->
    <div class="manager">后台管理系统</div>

    <!--  -->
    <div class="detail">
      <img src="../../../static/20140816114432535.png" />
      <span class="contant">
        <div class="type">{{type?'注册':'登陆'}}</div>
        <div class="id">login ID</div>
        <!-- 注册 -->
        <div v-show="type">
          <div class="list" v-for="(item,index) in post" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">
              <input type="text" :placeholder="item.plr" v-model="item.val" v-if="index!=3" />
              <el-select v-model="value" placeholder="请选择" v-else>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </div>
          <div class="btn">
            <el-button>注 册</el-button>
          </div>
        </div>
        <!-- 登陆 -->
        <div v-show="!type">
          <div class="listLogin" v-for="(item,index) in login" :key="index">
            <div class="name">{{item.name}}</div>
            <div class="val">
              <span class="input">
                <input type="text" :placeholder="item.plr" v-model="item.val" />
              </span>
              <span class="img" v-if="index==2" @click="getYZM">{{yzm}}</span>
              <span class="tip" v-if="index==2" @click="getYZM">{{yzm=='获取验证码'?'':'换一张'}}</span>
            </div>
          </div>
          <!-- <div class="noBB">
            <span class="child">忘记密码</span>
            <span class="child" @click="type=true">注册账号</span>
          </div>-->
          <div class="btnLogin" @click="toLogin">
            <el-button>登 录</el-button>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      type: false,
      yzm: "获取验证码",
      post: [
        {
          name: "账号",
          val: "",
          plr: "请输入登陆账号",
          text: "",
        },
        {
          name: "密码",
          val: "",
          plr: "请输入登录密码",
          text: "",
        },
        {
          name: "确认密码",
          val: "",
          plr: "请再次输入登录密码",
          text: "",
        },
        {
          name: "选择小区",
          val: "",
          plr: "请选择账户绑定小区",
          text: "",
        },
      ], //
      login: [
        {
          name: "账号",
          val: "",
          plr: "请输入登陆账号",
          text: "",
        },
        {
          name: "密码",
          val: "",
          plr: "请输入登陆密码",
          text: "",
        },
        {
          name: "验证码",
          val: "",
          plr: "请输入验证码",
          text: "",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ], //
      value: "", //
    };
  },
  methods: {
    //
    getYZM() {
      if (!this.login[0].val) return this.eFN("请输入账号！");
      this.getFN({
        url: "/systemmanager/login/code/" + this.login[0].val,
      }).then((s) => {
        if (s.data.status == "OK") {
          this.yzm = s.data.data;
        } else this.eFN(s.data.message);
      });
    },
    toLogin() {
      if(nuFN(this.login,"val")) return this.eFN('请输入填写完整内容！')
   
      this.postFN({
        url: "/systemmanager/login/conventionLogin",
        data: {
          password: this.login[1].val,
          username: this.login[0].val,
          verificationCode: this.login[2].val,
        },
      }).then((r) => {
        if(r.data.status=='OK') this.$router.push({path:'/workbench'})
        else this.eFN(r.data.message)
      });
    },
  },
};
</script>

<style lang="less">
#fuLogin {
  height: 100%;
  width: 100%;
  background: rgba(86, 161, 248, 1);
  // animation: mymove 0.8s;
  .manager {
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
    padding: 39px 84px 0;
  }
  //
  .detail {
    margin: auto;
    position: absolute;
    top: 02px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      margin-top: 30px;
      .el-button {
        margin-left: 30px;
        width: 430px;
        background: linear-gradient(
          90deg,
          rgba(86, 161, 248, 1) 0%,
          rgba(65, 141, 228, 1) 100%
        );
        height: 48px;
        border-radius: 31px;
        font-size: 22px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
    > img {
      position: relative;
      z-index: 2;
      width: 650px;
    }
    .contant {
      font-weight: 500;
      background: #fff;
      padding: 40px 47px 20px 115px;
      font-size: 20px;
      border-radius: 26px;
      margin-left: -140px;

      .type {
        font-size: 30px;
        color: #5b84e3;
      }
      .id {
        margin: 2px 0 18px;
        color: #868686;
      }
      .list {
        display: flex;
        align-items: center;
        height: 50px;
        margin-bottom: 16px;
        .name {
          min-width: 90px;
          text-align: right;
          color: #333333;
        }
        .val {
          margin-left: 20px;
          height: 50px;
          display: flex;
          align-items: center;
          width: 368px;
          border-radius: 31px;
          border: 1px solid #cccccc;
          overflow: hidden;
          padding: 0 20px;
          input {
            border: none;
            flex: 1;
            height: 100%;
            font-size: 18px;
          }
          .el-select {
            border: none;
            flex: 1;
            height: 100%;
            font-size: 18px;
            .el-input {
              height: 100%;
            }
          }
          ::placeholder {
            color: #cccccc;
          }
          .arrow {
            margin-left: 10px;
            font-size: 16px;
            width: 26px;
            height: 26px;
            background: rgba(69, 145, 232, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            opacity: 0.39;
            .el-icon-arrow-down {
              color: #fff;
            }
          }
        }
      }
      //
      .listLogin {
        .name {
          color: #333333;
          margin-bottom: 10px;
        }
        .val {
          height: 50px;
          display: flex;
          align-items: center;
          width: 368px;
          border-radius: 31px;
          border: 1px solid #cccccc;
          overflow: hidden;
          padding: 0 20px;
          margin-bottom: 30px;
          .input {
            flex: 1;
            input {
              border: none;
              height: 100%;
              font-size: 18px;
              width: 100%;
            }
          }
          .el-select {
            border: none;
            flex: 1;
            height: 100%;
            font-size: 18px;
            .el-input {
              height: 100%;
            }
          }
          ::placeholder {
            color: #cccccc;
          }
          .img {
            margin: 0 5px;
            font-size: 16px;
          }
          .tip {
            font-size: 12px;
            color: rgba(69, 145, 232, 1);
          }
        }
      }
      .noBB {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #868686;
      }
      .btnLogin {
        margin-top: 30px;
        .el-button {
          margin-left: 40px;
          width: 300px;
          background: linear-gradient(
            90deg,
            rgba(86, 161, 248, 1) 0%,
            rgba(65, 141, 228, 1) 100%
          );
          height: 48px;
          border-radius: 31px;
          font-size: 22px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}

@keyframes mymove {
  from {
    transform: translateY(100px);
    opacity: 0.3;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

