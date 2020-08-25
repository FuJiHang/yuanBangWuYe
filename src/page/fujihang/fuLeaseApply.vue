<!--
 * @Author: fujihang
 * @Date: 2020-07-20 15:27:58
 * @LastEditors: your name
 * @LastEditTime: 2020-07-30 17:30:13
 * @Description: 租赁申请
--> 

<template>
  <div id="fuLeaseApply">
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
      <div class="type" v-show="!workShow">
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
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column prop="type" label="工单类型"></el-table-column>
          <el-table-column prop="detail" label="详情描述"></el-table-column>
          <el-table-column prop="time" label="预约时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
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
    <!--  -->
    <template v-else>
      <div class="noticeT">
        <span class="name">申请租赁审核</span>
        <el-button size="small">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">签订人信息</span>
          <span class="val">
            <i class="el-icon-edit-outline"></i>
            编辑
          </span>
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in info" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">{{item.val}}</span>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="listDetail" v-for="(item,index) in workOrder" :key="index">
        <span class="name">{{item.name}}</span>
        <span :class="['val',index==3?'det':'']">{{item.val}}</span>
      </div>
      <div class="btnDetail">
        <el-button size="small">审核不通过</el-button>
        <el-button type="primary" size="small">通过并发送电子合同</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          phone: "13322228888",
          type: "室内报修",
          detail: "洗手池堵塞,无法下水",
          time: "2020-06-12 14:30",
          status: "未处理"
        },
        {
          name: "王鸿",
          phone: "13322228888",
          type: "室内报修",
          detail: "洗手池堵塞,无法下水",
          time: "2020-06-12 14:30",
          status: "未处理"
        },
        {
          name: "王鸿",
          phone: "13322228888",
          type: "室内报修",
          detail: "洗手池堵塞,无法下水",
          time: "2020-06-12 14:30",
          status: "未处理"
        }
      ],
      info: [
        {
          name: "姓名:",
          val: "王鸿",
          data: ""
        },
        {
          name: "性别:",
          val: "男",
          data: ""
        },
        {
          name: "手机:",
          val: "13344449999",
          data: ""
        },
        {
          name: "电话:",
          val: "020-44449999",
          data: ""
        },
        {
          name: "身份证号:",
          val: "420122199001010226",
          data: ""
        },
        {
          name: "默认住址:",
          val: "元邦山清水秀花园1栋205",
          data: ""
        },
        {
          name: "身份:",
          val: "业主",
          data: ""
        },
        {
          name: "邮箱:",
          val: "377789999@qq.com",
          data: ""
        }
      ],
      workOrder: [
        {
          name: "租赁车位号",
          val: "A区 102",
          data: ""
        },
        {
          name: "车牌号",
          val: "粤A 666666",
          data: ""
        },
        {
          name: "租用时间",
          val: "6个月",
          data: ""
        },
        {
          name: "申请时间",
          val: "2020-06-12  14:30",
          data: ""
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less">
#fuLeaseApply {
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
  //
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
        width: calc(25% - 42px);
        font-size: 16px;
        .name {
          color: #787878;
        }
        .val {
          font-weight: bold;
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
