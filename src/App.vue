<template>
  <div id="app">
    <!-- 标题 -->

    <template v-if="$route.name!='fuLogin'">
      <div class="fuNavFather">
        <span class="manage">后台管理系统</span>
        <span class="flex">
          <img src="/static/dizhi.png" />
          {{company}}
        </span>
        <div class="info">
          <span class="name">欢迎你 , 管理员</span>
          <span class="function mini">
            <img src="/static/youjian.png" />
            <span class="num">6</span>
          </span>
          <span class="function">
            <img src="/static/tishi.png" />
            <span class="num">6</span>
          </span>
          <img src="/static/tuichu.png" class="out" />
        </div>
      </div>

      <!-- 内容 -->
      <div class="fuContantFather">
        <!-- 左边导航条 -->
        <span class="fuMeun">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#242B35"
            text-color="#ffffff"
            active-text-color="#4C89D0"
            :unique-opened="true"
            :default-active="$store.state.refarTo"
          >
            <el-submenu :index="item.name" v-for="(item,index) in meunList" :key="index">
              <template slot="title">
                <img :src="item.img" @click="toFN(item.url)" />
                <span @click="toFN(item.url)">{{item.name}}</span>
              </template>

              <router-link :to="itemc.url" v-for="(itemc,i) in item.data" :key="i">
                <el-menu-item :index="itemc.name">{{itemc.name}}</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </span>
        <!-- 右边视图内容 -->

        <span class="fuContantMini">
          <!--  -->
          <div class="appNavTop">当前位置:{{$route.meta.name}}</div>
          <!-- 被缓存的 -->
          <transition name="bounce">
            <keep-alive>
              <router-view v-if="$route.meta.keeyAlive" />
            </keep-alive>
          </transition>
          <transition name="bounce">
            <!-- 不被缓存的 -->
            <router-view v-if="!$route.meta.keeyAlive" />
          </transition>
        </span>
      </div>
    </template>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // visible: false,
      company: "元邦·山清水秀家园",
      meunList: [
        {
          name: "工作台",
          img: require("../static/zhuye.png"),
          url: "/workbench",
          data: [
            {
              name: "最新工单",
              url: "/fuNewWorkOrder",
              data: [],
            },
            {
              name: "租赁申请",
              url: "/fuLeaseApply",
              data: [],
            },
            {
              name: "线上缴费",
              url: "/fuOnlinePay",
              data: [],
            },
            {
              name: "意见反馈",
              url: "/fuTestT",
              data: [],
            },
            {
              name: "用户绑定房产",
              url: "/fuBindPro",
              data: [],
            },
          ],
        },
        {
          name: "业主管理",
          img: require("../static/zhuye.png"),
          url: "/",
          data: [
            {
              name: "业主基本信息",
              url: "/fuDefaultInfo",
              data: [],
            },
            {
              name: "业主用户信息",
              url: "/fuUserInfo",
              data: [],
            },
          ],
        },
        {
          name: "房屋管理",
          img: require("../static/fangchan.png"),
          url: "/",
          data: [
            {
              name: "住宅管理",
              url: "/fuResiMana",
              data: [],
            },
            {
              name: "商铺管理",
              url: "/fuShopMana",
              data: [],
            },

            // {
            //   name: "1栋",
            //   url: "/fuHouseMana",
            //   data: [],
            // },
          ],
        },
        {
          name: "用户管理",
          img: require("../static/yonghuhaoyou.png"),
          url: "/fuUserMana",
          data: [],
        },
        {
          name: "工单管理",
          img: require("../static/gongdan.png"),
          url: "/",
          data: [
            {
              name: "室内报修",
              url: "/fuIndoorRepair",
              data: [],
            },
          ],
        },
        {
          name: "线上缴费",
          img: require("../static/gongdan.png"),
          url: "/fuOnlinePayT",
          data: [],
        },
        {
          name: "发布管理",
          img: require("../static/fabu.png"),
          url: "/",
          data: [
            {
              name: "物业通知",
              url: "/fuProperNotice",
              data: [],
            },
            {
              name: "实时资讯",
              url: "/fuRealTime",
              data: [],
            },
            {
              name: "社区实事",
              url: "/fuComFact",
              data: [],
            },
            {
              name: "节日活动",
              url: "/fuFestActivit",
              data: [],
            },
          ],
        },
        {
          name: "线上合同",
          img: require("../static/shoufeiguanli.png"),
          url: "/",
          data: [
            {
              name: "签约管理",
              url: "/fuOnlineCon",
              data: [],
            },
            {
              name: "合同管理",
              url: "/fuContract",
              data: [],
            },
          ],
        },
        {
          name: "预约管理",
          img: require("../static/suo.png"),
          url: "/",
          data: [
            {
              name: "门岗放行",
              url: "/fuGateRele",
              data: [],
            },
            {
              name: "车位预约",
              url: "/fuParkReser",
              data: [],
            },
          ],
        },
        {
          name: "物业排班",
          img: require("../static/paibanguanli.png"),
          url: "/fuProSche",
          data: [],
        },
        {
          name: "车位管理",
          img: require("../static/cheliangguanli.png"),
          url: "/fuParkLot",
          data: [],
        },
        {
          name: "评论反馈",
          img: require("../static/yijianfankui.png"),
          url: "/",
          data: [
            {
              name: "实时资讯",
              url: "/fuRealTimeInfor",
              data: [],
            },
            {
              name: "社区实事",
              url: "/fuComFactTwo",
              data: [],
            },
            {
              name: "意见反馈",
              url: "/fuFeedBack",
              data: [],
            },
          ],
        },
        {
          name: "用户发布",
          img: require("../static/xitong.png"),
          url: "/",
          data: [
            {
              name: "闲置转卖",
              url: "/fuIdleResa",
              data: [],
            },
            {
              name: "动态发布",
              url: "/fuRelease",
              data: [],
            },
            {
              name: "车位出租",
              url: "/fuDirRen",
              data: [],
            },
            {
              name: "车位转卖",
              url: "/fuDirBuy",
              data: [],
            },
          ],
        },
        {
          name: "物业管理",
          img: require("../static/xitong.png"),
          url: "/",
          data: [
            {
              name: "物业人员管理",
              url: "/fuEstateMana",
              data: [],
            },
            {
              name: "角色管理",
              url: "/fuRoleMana",
              data: [],
            },
          ],
        },

        {
          name: "直售广告",
          img: require("../static/suo.png"),
          url: "/",
          data: [
            {
              name: "最新楼盘",
              url: "/fuLastDeve",
              data: [],
            },
            {
              name: "直售车位",
              url: "/fuDirSale",
              data: [],
            },
          ],
        },
        {
          name: "积分管理",
          img: require("../static/suo.png"),
          url: "/",
          data: [
            {
              name: "积分赠送规则",
              url: "/fuBonusPoint",
              data: [],
            },
            {
              name: "积分兑换",
              url: "/fuRedeem",
              data: [],
            },
            {
              name: "物品兑换详情",
              url: "/fuPiontDet",
              data: [],
            },
          ],
        },

        // {
        //   name: "其他服务",
        //   img: require("../static/tongjileibie.png"),
        //   url: "/",
        //   data: [
        //     {
        //       name: "最新工单",
        //       url: "/fuTest",
        //       data: [],
        //     },
        //   ],
        // },
      ], //
    };
  },
  mounted() {
    this.clFN(this.meunList);
    // console.log(this.meunList, "=========");
  },
  methods: {
    clFN(data) {
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i].url,'=======');

        if (data[i].data.length) this.clFN(data[i].data);
      }
    },
    toFN(to) {
      to == "/" ? "" : this.$router.push({ path: to });
    },

  },
};
</script>

<style lang="less" >
//

#app {
  height: 100%;
  overflow: hidden;
  display: flex;
  background: #fff;
  flex-direction: column;
  .is-opened {
    .el-menu-item {
      background: rgba(45, 54, 66, 1) !important;
    }
    .el-submenu__title {
      background: rgba(86, 161, 248, 1) !important;
      > span {
        display: block;
        width: 100%;
      }
    }
    .el-submenu__icon-arrow {
      color: #fff !important;
    }
  }

  .el-submenu__title {
    display: flex;
    align-items: center;
    > img {
      height: 20px;
      margin-right: 15px;
    }
  }
  .fuNavFather {
    color: #fff;
    display: flex;
    align-items: center;
    height: 60px;
    background: #409eff;

    .manage {
      // box-sizing: border-box ;
      text-align: center;
      width: 215.91px;
      font-size: 20px;
      background: #4498f7;
      height: 80px;
      line-height: 80px;
    }
    .flex {
      flex: 1;
      padding: 0 37px;
      font-size: 16px;
      > img {
        height: 20px;
        margin-right: 12px;
      }
    }
    .info {
      .name {
        font-size: 16px;
        padding-right: 26px;
        border-right: 1px solid #fff;
      }
      .function {
        position: relative;
        margin-left: 30px;
        > img {
          height: 20px;
        }
        .num {
          position: absolute;
          top: -8px;
          right: -8px;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #ff0000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .mini {
        > img {
          height: 20px;
        }
      }
      .out {
        height: 22px;
        margin: 0 46px 0 40px;
      }
    }
    .people {
      border: 2px solid #fff;
      border-radius: 50%;
      height: 60px;
      width: 60px;
      object-fit: cover;
      margin-right: 10px;
    }
  }
  .fuContantFather {
    flex: 1;
    overflow: hidden;
    display: flex;
    .fuMeun {
      height: 100%;
      overflow: auto;
      width: 245.91px;
      .el-menu {
      }
      // width: 250px;
      .el-menu {
        height: 100%;
      }
    }
    .fuContantMini {
      height: 100%;
      width: 100%;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      //
      .appNavTop {
        margin: 0 22px;
        padding: 21px 0 13px;
        border-bottom: 1px solid #e4e4e4;
        color: #333333;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }

  //
  .bounce-enter-active {
    animation: bounce-in 0.3s;
  }

  @keyframes bounce-in {
    0% {
      transform: translateX(200px);
      opacity: 0.1;
    }
    // 50% {
    //   transform: translateX(-20px);
    // }
    // 75% {
    //   transform: translateX(50px);
    // }
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  }
}
</style>
