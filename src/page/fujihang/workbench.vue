<!--
 * @Author: fujihang
 * @Date: 2020-07-17 16:36:40
 * @LastEditors: your name
 * @LastEditTime: 2020-08-20 10:31:04
 * @Description: 最新工单
--> 


<template>
  <div id="workbench">
    <!--  -->
    <div class="notice">
      <span class="name">待处理任务</span>
      <span class="time">
        <el-date-picker v-model="timeChoose" type="date" placeholder="选择日期" @change="changeFN"></el-date-picker>
        <span class="flex">
          <img src="/static/zhongzhiG.png" />
          刷新
        </span>
      </span>
    </div>
    <!--  -->
    <div class="contant">
      <span class="child" v-for="(item,index) in notion" :key="index">
        <div class="name">
          <span class="big">{{item.name}}</span>
          共
          <span class="color">{{item.num}}</span>
          条数据
          <span class="img" @click="refurFN(item.even)">
            <img src="/static/zhongzhi.png" />
            <span class="num" v-if="item.total">+{{item.total}}</span>
          </span>
        </div>
        <el-table
          :data="item.data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column :prop="item.prop[0]" :label="item.list[0]" width="120"></el-table-column>
          <el-table-column :prop="item.prop[1]" :label="item.list[1]" width="120"></el-table-column>
          <el-table-column :prop="item.prop[2]" :label="item.list[2]" width="120"></el-table-column>
        </el-table>
        <div class="btn">
          <el-button type="primary" @click="toFN(item.to,item.name)">查看全部</el-button>
        </div>
      </span>
    </div>

    <!--  -->
    <el-dialog :visible.sync="zxgdDia" width="30%" :before-close="handleClose">
      <div class="title">报修工单</div>
      <div class="table">
        <div class="list">
          <span class="child">
            <span class="name">报修人</span>
            <span class="val">王鸿</span>
          </span>
          <span class="child">
            <span class="name">房号</span>
            <span class="val">元邦山清水秀1栋205</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">电话</span>
            <span class="val">13322228888</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">报修事项</span>
            <span class="detail">元邦山清水秀1栋205</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">预约时间</span>
            <span class="val">2020年5月28日 12:30</span>
          </span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary">确认接单</el-button>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog :visible.sync="zlsqDia" width="30%" :before-close="handleClose">
      <div class="title">租赁申请</div>
      <div class="table">
        <div class="list">
          <span class="child">
            <span class="name">申请人</span>
            <span class="val">王鸿</span>
          </span>
          <span class="child">
            <span class="name">房号</span>
            <span class="val">元邦山清水秀1栋205</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">电话</span>
            <span class="val">13322228888</span>
          </span>
          <span class="child">
            <span class="name">证件号</span>
            <span class="val">230451198802021122</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">申请事项</span>
            <span class="val">车位租用</span>
          </span>
          <span class="child">
            <span class="name">选择车位</span>
            <span class="val">A区 102号</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">车牌号</span>
            <span class="val">粤A 888888</span>
          </span>
          <span class="child">
            <span class="name">租用时间</span>
            <span class="val">6个月</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">申请时间</span>
            <span class="val">2020年5月28日 12:30</span>
          </span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" class="hui">审核不通过</el-button>
        <el-button type="primary">审核通过</el-button>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog :visible.sync="xsjfDia" width="30%" :before-close="handleClose">
      <div class="title">缴费单</div>
      <div class="table">
        <div class="list">
          <span class="child">
            <span class="name">业主</span>
            <span class="val">王鸿</span>
          </span>
          <span class="child">
            <span class="name">房号</span>
            <span class="val">元邦山清水秀1栋205</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">缴纳金额</span>
            <span class="val">¥ 250.45</span>
          </span>
          <span class="child">
            <span class="name">产生月份</span>
            <span class="val">2020年5月</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">缴纳费项</span>
            <span class="detail">物业服务费; 车位管理费; 代收电费</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">申请时间</span>
            <span class="val">2020年5月28日 12:30</span>
          </span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary">确认核销</el-button>
        <el-button type="primary">发 票</el-button>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog :visible.sync="yjfkDia" width="30%" :before-close="handleClose">
      <div class="title">反馈/建议</div>
      <div class="table">
        <div class="list">
          <span class="child">
            <span class="name">反馈人</span>
            <span class="val">王鸿</span>
          </span>
          <span class="child">
            <span class="name">地址</span>
            <span class="val">元邦山清水秀1栋205</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">反馈类型</span>
            <span class="val">社区建议</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">反馈内容</span>
            <span class="detail">合理规划停车位,小区停车位太少</span>
          </span>
        </div>
        <div class="list">
          <span class="child">
            <span class="name">提交时间</span>
            <span class="val">2020年5月28日 12:30</span>
          </span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary">确认查收</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeChoose: new Date(), //
      multipleSelection: [], //
      zxgdDia: false, //
      zlsqDia: false, //
      xsjfDia: false, //
      yjfkDia: false, //
      notion: [
        {
          name: "最新工单",
          num: 0,
          list: ["发起人", "事由", "状态"],
          total: 0,
          prop: ["proprietorName", "houseNumber", "state"],
          to:'/fuNewWorkOrder',
          data: [
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
          ],
        },
        {
          name: "租赁申请",
          num: 0,
          total: 0,
          prop: ["proprietorName", "houseNumber", "state"],
          list: ["申请人", "事项", "详情"],
          to:"/fuLeaseApply",
          data: [
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
          ],
        },
        {
          name: "线上缴费",
          num: 0,
          total: 0,
          prop: ["proprietorName", "houseNumber", "state"],
          list: ["姓名", "缴费金额", "后台核销"],
          to:"/fuOnlinePay",
          data: [
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
          ],
        },
        {
          name: "预约申请",
          num: 0,
          total: 0,
          prop: ["proprietorName", "houseNumber", "state"],
          list: ["预约人", "预约事项", "详情"],
          to:"/fuOnlinePay",

          data: [
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
          ],
        },
        {
          name: "意见反馈",
          num: 0,
          total: 0,
          prop: ["proprietorName", "houseNumber", "state"],
          list: ["反馈人", "事由", "详情"],
          to:"/fuTestT",
          data: [
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
          ],
        },
        {
          name: "绑定房产",
          num: 0,
          list: ["绑定人", "房号", "详情"],
          prop: ["proprietorName", "houseNumber", "state"],
          total: 0,
          even: "getPropri",
          to:"/fuBindPro",
          data: [
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
            {
              name: "王鸿",
              val: "室内报修",
              stutus: "未处理",
              choose: false,
            },
          ],
        },
      ],
    };
  }, //
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "======");
    },
    handleClose(done) {
      done();
    },
    getPropri() {
      let time =
        this.timeChoose.getFullYear() +
        "-" +
        (this.timeChoose.getMonth() + 1) +
        "-" +
        this.timeChoose.getDate();
      this.getFN({
        url: "/assetsservice/bindproprietor/untreated",
        data: {
          date: time,
        },
      }).then((r) => {
        if (r.data.status == "OK") {
          this.notion[5].total = r.data.data.total - this.notion[5].num;
          this.notion[5].data = r.data.data.records;
          this.notion[5].num = r.data.data.total;
        } else this.eFN(r.data.message);
      });
    },
    //
    refurFN(name) {
      console.log(name);
      let s = {
        getPropri: this.getPropri,
      };
      s[name]();
    },
    //
    changeFN() {
      this.getPropri();
    },
    //
    toFN(to,name) {
      this.$store.commit('toFN',name=='绑定房产'?'用户绑定房产':name)
      this.$router.push({ path: to });
    },
  },
  //
  mounted() {
    this.getPropri();
  },
};
</script>

<style lang="less">
#workbench {
  height: 100%;
  overflow: auto;

  //
  .notice {
    display: flex;
    align-items: center;
    padding: 43px 37px 30px;
    .name {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
    }
    .time {
      margin-left: 80px;
      display: flex;
      align-items: center;
      flex: 1;
      .el-input__inner {
        font-size: 20px;
        color: #454545;
      }
      .flex {
        flex: 1;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        color: #a7a7a7;
        font-size: 20px;
        font-weight: bold;
        > img {
          margin-right: 5px;
        }
      }
    }
  }
  //
  .contant {
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    flex-wrap: wrap;
    .child {
      min-width: 380px;
      box-sizing: border-box;
      background: #fff;
      margin: 0 15px 30px;
      box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
      border-radius: 10px;
      thead tr th {
        background: rgba(246, 246, 246, 1);
      }
      .name {
        display: flex;
        align-items: center;
        padding: 24px 14px 30px 14px;
        font-size: 14px;
        .big {
          font-size: 18px;
          font-weight: bold;
          margin-right: 11px;
        }
        .color {
          color: #56a1f8;
        }
        .img {
          margin-left: 11px;
          position: relative;
          .num {
            position: absolute;
            top: -20px;
            right: -20px;
            color: #f28888;
            font-size: 18px;
          }
        }
      }
      .btn {
        padding: 9px;
        text-align: center;
      }
    }
  }
  //
  .el-dialog {
    width: 35% !important;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0 30px;
    .title {
      color: #454545;
      padding: 20px 0;
      text-align: center;
      border-bottom: 1px dashed #979797;
      font-size: 22px;
    }
    .table {
      padding: 17px 0 0;
      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .child {
          display: flex;
          align-items: baseline;
          flex: 1;
          .name {
            color: #454545;
            font-size: 18px;
            width: 85px;
          }
          .val {
            padding: 9px 16px;
            background: rgba(242, 242, 242, 1);
            font-size: 16px;
            color: #454545;
          }
          .detail {
            flex: 1;
            padding: 9px 16px;
            background: rgba(242, 242, 242, 1);
          }
        }
      }
    }
    .btn {
      text-align: center;
      padding: 10px 0 20px;
      .el-button--primary {
        width: 160px;
      }
    }
  }
  .hui {
    background: rgba(178, 189, 202, 1);
    border-color: rgba(178, 189, 202, 1);
  }
}
</style>