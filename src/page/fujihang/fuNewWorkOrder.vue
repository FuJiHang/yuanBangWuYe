<!--
 * @Author: fujihang
 * @Date: 2020-07-20 13:42:10
 * @LastEditors: your name
 * @LastEditTime: 2020-08-08 15:51:55
 * @Description: 最新工单
--> 


<template>
  <div id="fuNewWorkOrder">
    <!--  -->
    <div class="notice">
      <span class="name">{{workShow?'工单处理':'待处理任务'}}</span>
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
        <span class="name">工单类型</span>
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
    <div class="tableWork" v-show="!workShow">
      <el-table
        ref="multipleTable"
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

    <!-- 工单处理 -->
    <div class="workOrder" v-show="workShow">
      <div class="list" v-for="(item,index) in workOrder" :key="index">
        <span class="name">{{item.name}}</span>
        <span :class="['val',index==3?'det':'']">{{item.val}}</span>
      </div>
      <div class="list">
        <span class="name">工单分派</span>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button type="primary" size="small">确  定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workShow: !false,
      currentPage4: 1,
      value1: "",
      input3: "",
      options2: [
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
      value2: "",
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
      multipleSelection: "",
      workOrder: [
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

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less">
#fuNewWorkOrder {
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
  .workOrder {
    margin-top: 30px;
    .list {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      margin-bottom: 20px;
      .name {
        width: 80px;
        color: #808080;
      }
      .val {
        width: 400px;
        border: 1px solid rgba(182, 182, 182, 1);
        padding: 8px 10px;
      }
      .el-input__inner {
        width: 400px;
        font-size: 16px;
        background: none;
        border-color: rgba(182, 182, 182, 1);
      }
    }
    .btn{
      margin-top: 30px;
      text-align: center;
      .el-button{
        width:160px;
        font-size: 20px;
      }
    }
  }
}
</style>