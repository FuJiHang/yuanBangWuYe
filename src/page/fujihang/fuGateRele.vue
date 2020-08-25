<!--
 * @Author: fujihang
 * @Date: 2020-07-22 18:14:17
 * @LastEditors: your name
 * @LastEditTime: 2020-08-14 17:43:54
 * @Description: 门岗放行
--> 


<template>
  <div id="fuGateRele">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">来访时间</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </span>
        <span class="child">
          <span class="name">业主姓名</span>
          <el-input v-model="value" clearable></el-input>
        </span>

        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          门岗放行
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small" class="hui" @click="showDoor=false">修改</el-button>
          <el-button type="primary" size="small" class="hui">删除</el-button>
        </span>
      </span>
      <!--  -->

      <div class="tableWork">
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="业主姓名" align="center"></el-table-column>
          <el-table-column prop="room" label="户号" align="center"></el-table-column>
          <el-table-column prop="num" label="来访人数" align="center"></el-table-column>
          <el-table-column prop="time" label="来访时间" align="center"></el-table-column>
          <el-table-column prop="mudi" label="目的" align="center"></el-table-column>
          <el-table-column prop="car" label="车牌号码" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>
        <!--  -->
        <el-pagination
          
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          
          
          layout="prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
    <!--  -->
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">门岗放行详情</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">业主信息</span>
          <!-- <span class="val">
            <i class="el-icon-edit-outline"></i>
            编辑
          </span> -->
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in info" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">{{item.val}}</span>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="record">
          <el-button type="primary" size="small">放行记录</el-button>
      </div>
      <!--  -->
      <div class="onlineCon">
        <span class="child" v-for="(item,index) in onlineCon" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="val">{{item.val}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDoor: true,
      value: "",
      value1: "",
      currentPage4: 1,
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
      tableData: [
        {
          name: "王鸿",
          room: "1栋205",
          num: "3人",
          time: "2020-06-12 14:30",
          mudi: "探访",
          car: "粤A 888888",
          status: "进行中"
        },
        {
          name: "王鸿",
          room: "1栋205",
          num: "3人",
          time: "2020-06-12 14:30",
          mudi: "探访",
          car: "粤A 888888",
          status: "进行中"
        }
      ],
      onlineCon: [
        {
          name: "来访人数",
          val: "2人",
          data: ""
        },
        {
          name: "目的",
          val: "探访",
          data: ""
        },
        {
          name: "预约时间",
          val: "2020-06-12  14:30",
          data: ""
        },
        {
          name: "来访时间",
          val: "2020-06-12  14:30",
          data: ""
        },
         {
          name: "车牌号",
          val: " ",
          data: ""
        },
        {
          name: "状态",
          val: "进行中",
          data: ""
        },
        
      ],
      multipleSelection: [], //
      jindu: [
        {
          name: "业主姓名",
          val: "王鸿",
          data: ""
        },
        {
          name: "报修类型",
          val: "室内报修",
          data: ""
        },
        {
          name: "报修时间",
          val: "2020-06-12  14:30",
          data: ""
        },
        {
          name: "报修详情",
          val: "洗手池堵塞,无法下水",
          data: ""
        },
        {
          name: "预约时间",
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
#fuGateRele {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  .bgContant {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    margin: 19px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  //
  .chooseList {
    display: flex;
    align-items: center;
    padding: 22px 40px;
    .child {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .name {
        font-weight: bold;
        margin-right: 15px;
        font-size: 18px;
        width: 100px;
      }
      .el-input__inner {
        font-size: 16px;
      }
    }
    .flex {
      flex: 1;
      text-align: right;
    }
  }
  //
  .funtion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px 16px;
    .name {
      font-size: 20px;
      > img {
        height: 18px;
      }
    }
    .hui {
      background: rgba(192, 206, 223, 1);
      border-color: rgba(192, 206, 223, 1);
    }
    .mini {
      font-size: 14px;
      margin-left: 10px;
      .blue {
        color: #56a1f8;
      }
    }
    .el-button {
      width: 100px;
      font-size: 18px;
    }
  }
  //
  .tableWork {
    flex: 1;
    display: flex;
    flex-direction: column;
    thead tr th {
      background: rgba(246, 246, 246, 1);
    }
    .el-table {
      height: 100%;
    }
    .el-pagination {
      padding: 20px 0;
      text-align: center;
    }
  }
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
    margin: 0 30px 33px;
    border-radius: 10px;
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
  .record{
      padding: 0 29px;
      margin-bottom: 30px;
      .el-button{
          width: 120px;
          font-size: 15px;
      }
  }
  //
  .onlineCon {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .child {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      font-size: 16px;
      margin-bottom: 25px;
      .name {
        width: 110px;

        color: #808080;
      }
      .val {
        border: 1px solid rgb(185, 185, 185);
        padding: 5px 20px;
        width: 300px;
      }
    }
  }
}
</style>