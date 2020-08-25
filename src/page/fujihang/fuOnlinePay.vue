<!--
 * @Author: fujihang
 * @Date: 2020-07-20 16:45:45
 * @LastEditors: your name
 * @LastEditTime: 2020-07-22 11:20:39
 * @Description: 线上缴费
--> 

<template>
  <div id="fuOnlinePay">
    <template v-if="true">
      <!--  -->
      <div class="notice">
        <span class="name">待处理任务</span>
        <span class="time">
          <span class="flex">
            <img src="/static/zhongzhiG.png" />
            刷新
          </span>
        </span>
      </div>
      <!--  -->
      <div class="type">
        <!--  -->
        <span class="child">
          <span class="name">租赁类型</span>
          <span class="val">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span class="child">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </span>
        <span class="child">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </span>
        <span class="delect">
          <el-button size="small">删除</el-button>
        </span>
      </div>
      <!--  -->
      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="业主姓名"></el-table-column>
          <el-table-column prop="room" label="房号"></el-table-column>
          <el-table-column prop="val" label="缴费金额"></el-table-column>
          <el-table-column prop="detail" label="缴纳费项"></el-table-column>
          <el-table-column prop="time" label="缴费时间"></el-table-column>
          <el-table-column prop="status" label="后台核销"></el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          
          
          layout="prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </template>
    <template v-else>
      <div class="noticeT">
        <span class="name">线上缴费详情</span>
        <el-button size="small">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">缴费房屋信息</span>
          <span class="val">
            <i class="el-icon-edit-outline"></i>
            编辑
          </span>
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in info" :key="index">
            <span class="name">{{item.name}}</span>
            <span :class="['val',index==4?'red':'']">{{item.val}}</span>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="listDetail" v-for="(item,index) in workOrder" :key="index">
        <span class="name">{{item.name}}</span>
        <span :class="['val',index==4?'red':'']">{{item.val}}</span>
      </div>
      <div class="btnDetail">
        <el-button type="primary" size="small">后台核销</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: "",
      input3: "",
      multipleSelection: [],
      tableData: [
        {
          name: "王鸿",
          room: "元邦山清水秀1栋205",
          val: "¥ 250.45",
          detail: "6月份物业服务费; 车位管理费; 代收电费…",
          time: "2020-06-12 14:30",
          status: "未处理"
        },
        {
          name: "王鸿",
          room: "元邦山清水秀1栋205",
          val: "¥ 250.45",
          detail: "6月份物业服务费; 车位管理费; 代收电费…",
          time: "2020-06-12 14:30",
          status: "未处理"
        }
      ],
      info: [
        {
          name: "缴费房号:",
          val: "元邦山清水秀花园1栋205",
          data: ""
        },
        {
          name: "业主姓名:",
          val: "王鸿",
          data: ""
        },
        {
          name: "手机:",
          val: "13344449999",
          data: ""
        },
        {
          name: "累计缴费:",
          val: "¥ 12468.23元",
          data: ""
        },
        {
          name: "历史未缴:",
          val: "¥ 1358.24",
          data: ""
        },
        {
          name: "绑定家人:",
          val: "3人",
          data: ""
        }
      ],
      workOrder: [
        {
          name: "缴费人",
          val: "王晶(家人)",
          data: ""
        },
        {
          name: "缴费金额",
          val: "250.45元",
          data: ""
        },
        {
          name: "缴纳费项",
          val: "6月份物业服务费; 车位管理费; 代收电费",
          data: ""
        },
        {
          name: "缴纳时间",
          val: "2020-06-12  14:30",
          data: ""
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
#fuOnlinePay {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  //
  .notice {
    display: flex;
    align-items: center;
    padding: 20px 25px 18px;
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
  .type {
    padding: 0 30px;
    display: flex;
    align-items: center;
    .child {
      display: flex;
      align-items: center;
      margin: 0 16px;
      .name {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
      }
    }
    .delect {
      flex: 1;
      text-align: right;
      .el-button {
        width: 100px;
        background: rgba(192, 206, 223, 1);
        color: #fff;
        font-size: 16px;
      }
    }
    .el-input__inner {
      font-size: 16px;
    }
  }
  .tableWork {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .el-table {
      height: 100%;
    }
    .el-pagination {
      padding: 20px 0;
      text-align: center;
    }
  }
  //
  .noticeT {
    display: flex;
    align-items: center;
    margin: 28px 29px;
    border-left: 6px solid #4799f7;
    padding-left: 20px;
    .name {
      font-size: 22px;
      font-weight: bold;
      flex: 1;
    }
    .el-button {
      border-radius: 6px;
      border: 1px solid rgba(71, 153, 247, 1);
      color: #4799f7;
      font-size: 18px;
      width: 100px;
    }
  }
  //
  .info {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 0 30px 53px;
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px;
      .name {
        font-size: 20px;
        font-weight: bold;
      }
      .val {
        color: #4799f7;
        font-size: 16px;
        display: flex;
        align-items: center;
        .el-icon-edit-outline {
          font-size: 22px;
          margin-right: 5px;
        }
      }
    }
    .contant {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      .child {
        margin: 0 21px 36px;
        width: calc(33.33% - 42px);
        font-size: 16px;
        .name {
          color: #787878;
        }
        .val {
          font-weight: bold;
        }
        .red {
          color: #e83030;
        }
      }
    }
  }
  //
  .listDetail {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-bottom: 20px;
    .name {
      width: 140px;
      color: #808080;
    }
    .val {
      width: 400px;
      border: 1px solid rgba(182, 182, 182, 1);
      padding: 8px 10px;
    }
  }
  .btnDetail {
    margin-top: 30px;
    text-align: center;
    .el-button {
      min-width: 160px;
      font-size: 20px;
      margin: 0 50px;
    }
  }
}
</style>
