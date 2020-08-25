<!--
 * @Author: fujihang
 * @Date: 2020-07-20 17:15:09
 * @LastEditors: your name
 * @LastEditTime: 2020-07-31 16:23:57
 * @Description: 房屋管理
--> 
<template>
  <div id="fuHouseMana">
    <template v-if="false">
      <div class="chooseList">
        <span class="child">
          <span class="name">房屋状态</span>
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
          <span class="name">单元号</span>
          <el-input v-model="input" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">房号</span>
          <el-input v-model="input2" clearable></el-input>
        </span>
        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">元邦·山清水秀家园</span>
        <span class="val">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small" class="hui">修改</el-button>
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
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="楼栋"></el-table-column>
          <el-table-column prop="room" label="房号"></el-table-column>
          <el-table-column prop="status" label="房屋状态"></el-table-column>
          <el-table-column prop="people" label="业主姓名"></el-table-column>
          <el-table-column prop="phone" label="业主电话"></el-table-column>
          <el-table-column prop="time" label="售出时间"></el-table-column>
          <el-table-column prop="num" label="绑定人数"></el-table-column>
          <el-table-column prop="fun" label="操作"></el-table-column>
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
          <span class="name">房屋信息</span>
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
      <div class="people">
        <div class="navtap">
          <span class="name">王鸿的</span>
          <span class="val">家人</span>
          <span class="flex">人数: 3人</span>
        </div>
        <div class="add">
          <el-button size="small">新增家人</el-button>
        </div>
        <div class="list" v-for="(item,index) in people" :key="index">
          <img :src="item.img" />
          <span class="contant">
            <span class="flex">
              <div class="name">{{item.name}}</div>
              <div class="val">{{item.val}}</div>
            </span>
            <el-button size="small" type="primary">删除</el-button>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
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
      input: "",
      input2: "",
      tableData: [
        {
          name: "1栋A单元",
          room: "0208",
          status: "已售出",
          people: "王鸿",
          phone: "13322228888",
          time: "2020-06-12 14:30",
          num: "3人",
          fun: "查看详情"
        },
        {
          name: "1栋A单元",
          room: "0208",
          status: "已售出",
          people: "王鸿",
          phone: "13322228888",
          time: "2020-06-12 14:30",
          num: "3人",
          fun: "查看详情"
        }
      ],
      info: [
        {
          name: "房屋状态:",
          val: "已售出",
          data: ""
        },
        {
          name: "房屋面积:",
          val: "78.6平方米",
          data: ""
        },
        {
          name: "房屋地址:",
          val: "广州市花都区128号",
          data: ""
        },
        {
          name: "房屋类型:",
          val: "住宅",
          data: ""
        },
        {
          name: "业主姓名:",
          val: "王鸿",
          data: ""
        },
        {
          name: "身份证号:",
          val: "420122199001010226",
          data: ""
        },
        {
          name: "电话:",
          val: "13344449999",
          data: ""
        },
        {
          name: "绑定家人:",
          val: "3人",
          data: ""
        }
      ],
      people: [
        {
          name: "Victoria",
          val: "13344448888",
          img: ""
        },
        {
          name: "Victoria",
          val: "13344448888",
          img: ""
        },
        {
          name: "Victoria",
          val: "13344448888",
          img: ""
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
#fuHouseMana {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
  margin: 19px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
        width: 80px;
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
    }
    .hui {
      background: rgba(192, 206, 223, 1);
      border-color: rgba(192, 206, 223, 1);
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
  //
  .people {
    //
    .navtap {
      font-weight: bold;
      font-size: 18px;
      display: flex;
      align-items: flex-end;
      color: #4799f7;
      margin: 0 50px 20px;
      border-bottom: 1px solid rgb(238, 238, 238);
      padding-bottom: 20px;
      .name {
        font-size: 22px;
        padding-right: 15px;
        border-right: 1px solid rgb(238, 238, 238);
        margin-right: 20px;
      }
      .val {
        flex: 1;
      }
    }
    .add {
      margin: 0 50px 20px;
      .el-button {
        border-color: #4799f7;
        color: #4799f7;
        font-size: 16px;
      }
    }
    .list {
      display: flex;
      align-items: center;
      margin: 0 50px 0 60px;
      > img {
        height: 60px;
        margin-right: 20px;
      }
      .contant {
        flex: 1;
        font-weight: bold;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(238, 238, 238);
        .flex {
          flex: 1;
          padding: 15px 0;
        }
        .name {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .val {
          font-size: 14px;
          color: #4799f7;
        }
      }
      .el-button {
        font-size: 16px;
        width: 110px;
      }
    }
  }
}
</style>