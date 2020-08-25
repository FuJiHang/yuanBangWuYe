<!--
 * @Author: fujihang
 * @Date: 2020-07-21 17:28:34
 * @LastEditors: your name
 * @LastEditTime: 2020-08-03 16:37:19
 * @Description: 室内报修    
--> 
<template>
  <div id="fuIndoorRepair">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">按状态删选</span>
          <span class="val">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span class="child">
          <span class="name">姓名</span>
          <el-input v-model="input" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">房号</span>
          <span class="val">
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
        </span>
        <span class="flex">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </span>
      </div>
      <!--  -->
      <span class="funtion">
        <span class="name">
          注册用户
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-button type="primary" size="small" @click="alertJD=true">新增</el-button>
          <el-button type="primary" size="small" class="hui" @click="showDoor=false">修改</el-button>
          <el-button type="primary" size="small" class="hui" @click="showDoor=false">删除</el-button>
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
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" align="center"></el-table-column>
          <el-table-column prop="room" label="房号" align="center"></el-table-column>
          <el-table-column prop="detail" label="事由" align="center"></el-table-column>
          <el-table-column prop="time" label="发起时间" align="center"></el-table-column>
          <el-table-column prop="status" label="状态"    align="center"></el-table-column>
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
      <!--  -->
      <div class="notice">
        <span class="name">工单处理进度</span>
        <span class="time">
          <span class="flex">
            <img src="/static/zhongzhiG.png" />
            刷新
          </span>
        </span>
      </div>
      <!--  -->
      <div class="manage">
        <span class="left">
          <div class="child" v-for="(item,index) in jindu" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">{{item.val}}</span>
          </div>
          <div class="child">
            <span class="name">工单分派</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </span>
        <span class="right">
          <div class="navtop" @click="alertJD=true">
            <img src />
            <span class="name">工单进度</span>
            <img src class="add" />
            添加进度
          </div>
          <div class="speed">
            <div class="child">
              <span class="time">
                <div class="day">05-28</div>
                <div class="hour">15:24</div>
              </span>
              <span class="img">
                <img src="/static/ok.png" />
              </span>
              <span class="det">
                <div class="name">已分派</div>
                <div class="val">
                  工单已经分派至物业部
                  <span class="color">李强</span>,如有疑问请致电:
                  <span class="color">1223334444</span>
                </div>
              </span>
            </div>
          </div>
        </span>
      </div>
    </div>

    <!--  -->
    <el-dialog title="添加进度" :visible.sync="alertJD">
      <div class="list">
        <span class="child">
          <span class="name">工单进程</span>
          <el-select v-model="jCChoose" placeholder="请选择">
            <el-option
              v-for="item in jCList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">分派人员</span>
          <el-select v-model="ppChoose" placeholder="请选择">
            <el-option
              v-for="item in ppList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div class="list">
        <span class="child">
          <span class="name">联系电话</span>
          <el-input v-model="jcPhone"></el-input>
        </span>
        <span class="child">
          <span class="name">添加时间</span>
          <el-input v-model="jcTime"></el-input>
        </span>
      </div>
      <div class="help">
        <span class="name">附加说明</span>
        <textarea></textarea>
      </div>
      <div class="btn">
        <el-button type="primary" size="small">确定添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDoor: true,
      value: "",
      value2: "",
      currentPage4: 1,
      input: "",
      tableData: [
        {
          name: "王鸿",
          phone: "13322228888",
          room: "元邦山清水秀花园1栋205",
          detail: "洗手池堵塞,无法下水",
          time: "2020-06-12 14:30",
          status: "处理中"
        },
        {
          name: "王鸿",
          phone: "13322228888",
          room: "元邦山清水秀花园1栋205",
          detail: "洗手池堵塞,无法下水",
          time: "2020-06-12 14:30",
          status: "处理中"
        }
      ],
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
      option: [
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
      ],
      //
      alertJD: false,
      jCList: [
        {
          value: "选项1",
          label: "已到场"
        }
      ],
      jCChoose: "",
      ppList: [
        {
          value: "选项1",
          label: "李强"
        }
      ],
      ppChoose: "",
      jcPhone: "",
      jcTime: ""
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
#fuIndoorRepair {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  .bgContant2 {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .manage {
    height: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(206, 218, 232, 1);
    border-radius: 10px;
    margin: 0 50px 50px;
    overflow: hidden;
    display: flex;
    align-items: center;

    .right {
      flex: 1;
      overflow: hidden;
      height: 100%;
      padding: 50px 40px;
      .navtop {
        display: flex;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px dashed rgba(206, 218, 232, 1);
        color: #808080;
        > img {
          height: 25px;
          margin-right: 10px;
        }
        .name {
          font-size: 18px;
          flex: 1;
          font-weight: bold;
          color: #333;
        }
        .add {
          margin-right: 10px;
          height: 18px;
        }
      }
      .speed {
        .child {
          display: flex;
          //   align-items: center;
          overflow: hidden;
          padding: 30px 0;
          .time {
            margin-top: -10px;
            text-align: right;
            .day {
              color: #484848;
              font-size: 18px;
            }
            .hour {
              color: #808080;
              font-size: 16px;
            }
          }
          .img {
            position: relative;
            margin: 0 15px;
          }
          .img > img {
            height: 26px;
            position: relative;
            z-index: 3;
            background: #fff;
          }
          .img::after {
            position: absolute;
            content: "";
            height: 500px;
            width: 1.5px;
            background: rgb(209, 209, 209);
            top: 10px;
            left: 12.8px;
          }
          .det {
            .name {
              margin-bottom: 10px;
              font-size: 18px;
              color: #202020;
            }
            .val {
              .color {
                color: #f3931e;
              }
            }
          }
        }
      }
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      border-right: 1px dashed rgba(206, 218, 232, 1);
      padding: 80px 0;
      box-sizing: border-box;
      .child {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 25px;
        .name {
          margin-right: 20px;
          color: #808080;
        }
        .val {
          width: 300px;
          padding: 10px 34px;
          border: 1px solid rgba(182, 182, 182, 1);
        }
      }
    }
  }

  //
  .el-dialog {
    .list {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .child {
        display: flex;
        align-items: center;
        margin: 0 30px;
        .name {
          width: 80px;
        }
      }
    }
    .el-dialog__header {
      padding: 20px 0;
      text-align: center;
      margin: 0 20px;
      border-bottom: 1px dashed rgb(219, 219, 219);
    }
    .help{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .name{
        margin-right: 20px;
      }
      textarea{
        height: 150px;
        width: 500px;
        border: 1px solid rgb(209, 209, 209);
        padding: 20px; 
        box-sizing: border-box;
        font-size: 14px;
      }
    }
    .btn{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      .el-button{
        width: 110px;
      }
    }
  }
}
</style>