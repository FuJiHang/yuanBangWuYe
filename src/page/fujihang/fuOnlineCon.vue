<!--
 * @Author: fujihang
 * @Date: 2020-07-22 17:31:33
 * @LastEditors: your name
 * @LastEditTime: 2020-08-14 18:08:17
 * @Description: 线上合同
--> 

<template>
  <div id="fuOnlineCon">
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">姓名</span>
          <el-input v-model="input" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">房号</span>
          <span class="val">
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in option"
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
          线上合同
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
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="park" label="租赁车位号"></el-table-column>
          <el-table-column prop="car" label="车牌号"></el-table-column>
          <el-table-column prop="time" label="租用时间"></el-table-column>
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
    </div>
    <!--  -->
    <div class="bgContant2" v-show="!showDoor">
      <div class="noticeT">
        <span class="name">合同详情</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">签订人信息</span>
        </div>
        <div class="contant">
          <span class="child" v-for="(item,index) in info" :key="index">
            <span class="name">{{item.name}}</span>
            <span class="val">{{item.val}}</span>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="onlineCon">
        <span class="child" v-for="(item,index) in onlineCon" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="val">{{item.val}}</span>
        </span>
      </div>
      <!--  -->
      <div class="btnList">
        <!-- <el-button class="hui" size="small">审核不通过</el-button>
        <el-button type="primary" size="small">审核通过</el-button>-->
        <el-button class="hui" size="small">查看电子合同</el-button>
        <el-button type="primary" size="small">终止合同</el-button>
      </div>
    </div>

    <el-dialog title="电子合同" :visible.sync="parkAlert">
      <div class="heton">
        <span class="name">合同:</span>
        <span class="val">
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div class="btn">
        <el-button type="primary" size="small">发送电子合同</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkAlert: true,
      showDoor: true,
      value: "",
      value2: "",
      currentPage4: 1,
      input: "",
      tableData: [
        {
          name: "王鸿",
          idCard: "440882199612090352",
          phone: "13322228888",
          park: "A区 103",
          car: "粤A 666666",
          time: "6个月",
          status: "待审核",
        },
        {
          name: "王鸿",
          idCard: "440882199612090352",
          phone: "13322228888",
          park: "A区 103",
          car: "粤A 666666",
          time: "6个月",
          status: "待审核",
        },
      ],
      option: [
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
      ],
      info: [
        {
          name: "姓名:",
          val: "王鸿",
          data: "",
        },
        {
          name: "性别:",
          val: "男",
          data: "",
        },
        {
          name: "手机:",
          val: "13344449999",
          data: "",
        },
        {
          name: "电话:",
          val: "020-44449999",
          data: "",
        },
        {
          name: "身份证号:",
          val: "420122199001010226",
          data: "",
        },
        {
          name: "默认住址:",
          val: "元邦山清水秀花园1栋205",
          data: "",
        },
        {
          name: "身份:",
          val: "业主",
          data: "",
        },
        {
          name: "邮箱:",
          val: "377789999@qq.com",
          data: "",
        },
      ],
      onlineCon: [
        {
          name: "租赁车位号",
          val: "A区 102",
          data: "",
        },
        {
          name: "租用时间",
          val: "6个月",
          data: "",
        },
        {
          name: "支付方式",
          val: "按月支付",
          data: "",
        },
        {
          name: "支付金额",
          val: "310元",
          data: "",
        },
        {
          name: "车牌号",
          val: "粤A 666666",
          data: "",
        },

        {
          name: "合同截止时间",
          val: "2020-06-12  14:30",
          data: "",
        },
      ],
      onlineCon2: [
        {
          name: "租赁车位号",
          val: "A区 102",
          data: "",
        },
        {
          name: "租用时间",
          val: "6个月",
          data: "",
        },
        {
          name: "车牌号",
          val: "粤A 666666",
          data: "",
        },
        {
          name: "租金",
          val: "2000元/月",
          data: "",
        },
        {
          name: "合同生成日期",
          val: "2020-06-12  14:30",
          data: "",
        },

        {
          name: "合同截止时间",
          val: "2020-06-12  14:30",
          data: "",
        },
      ],
      multipleSelection: [], //
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less">
#fuOnlineCon {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
  .el-dialog {
    width:400px;
    text-align: center;
    .el-dialog__header {
      padding: 20px 0;
      text-align: center;
      margin: 0 20px;
      border-bottom: 1px dashed rgb(219, 219, 219);
    }
    .btn {
      margin-top: 20px;
      text-align: center;
      .el-button {
        width: 110px;
      }
    }
  }
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
        width: 60px;
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
  .bgContant2 {
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
        margin-bottom: 20px;
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
  .btnList {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    .el-button {
      width: 150px;
      font-size: 16px;
      color: #fff;
      margin: 0 30px;
    }
    .hui {
      background: #a2a6ab;
    }
  }
}
</style>