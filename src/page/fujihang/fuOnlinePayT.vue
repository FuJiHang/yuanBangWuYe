<!--
 * @Author: fujihang
 * @Date: 2020-07-22 11:04:03
 * @LastEditors: your name
 * @LastEditTime: 2020-08-17 10:09:59
 * @Description: 线上缴费
--> 
<template>
  <div id="fuOnlinePayT">
    <!--  -->
    <div class="bgContant" v-show="showDoor">
      <div class="chooseList">
        <span class="child">
          <span class="name">业主姓名</span>
          <el-input v-model="name" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">房号</span>
          <el-input v-model="roomId" clearable></el-input>
        </span>
        <span class="child">
          <span class="name">缴费状态</span>
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
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="i" label="序号" align="center"></el-table-column>
          <el-table-column prop="name" label="业主姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column prop="status" label="账户状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
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
        <span class="name">2020年4月缴费清单</span>
        <el-button size="small" @click="showDoor=true">返回</el-button>
      </div>
      <div class="info">
        <div class="nav">
          <span class="name">缴纳房屋信息</span>
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
      <span class="funtion">
        <span class="name">
          2020年4月缴费清单
          <span class="mini">
            共
            <span class="blue">800</span>条数据
          </span>
          <img src="/static/zhongzhiG.png" />
        </span>
        <span class="val">
          <el-date-picker
            style="margin-right:20px;"
            v-model="value1"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- class="hui" -->
          <el-button type="primary" size="small" @click="addAlert=true">新增</el-button>
        </span>
      </span>
      <!--  -->
      <!-- name:"王鸿",
          roomId:'A栋0205',
          tip:"车位物业停车费",
          fee:"¥ 3541.23",
          time:"2020-4-12  12:30",
          status:"待缴费"
           payTime:"2020-5-1 14:10",
          payName:"王晶",
      payType:"微信支付",-->

      <div class="tableWork">
        <el-table
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="支付时间">
                  <span>{{ props.row.payTime }}</span>
                </el-form-item>
                <el-form-item label="支付人姓名">
                  <span>{{ props.row.payName }}</span>
                </el-form-item>
                <el-form-item label="支付方式">
                  <span>{{ props.row.payType }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="业主姓名" align="center"></el-table-column>
          <el-table-column prop="roomId" label="房号" align="center"></el-table-column>
          <el-table-column prop="tip" label="费项" align="center"></el-table-column>
          <el-table-column prop="fee" label="生成费用" align="center"></el-table-column>
          <el-table-column prop="time" label="产生时间" align="center"></el-table-column>
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
    <el-dialog title="添加缴费" :visible.sync="addAlert">
      <div class="list">
        <span class="child">
          <span class="name">费项</span>
          <el-select v-model="infoPark[0]" placeholder="请选择">
            <el-option
              v-for="item in ppList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="child">
          <span class="name">产生时间</span>
          <el-date-picker
            v-model="infoPark[1]"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </span>
      </div>
      <div class="list">
        <span class="child">
          <span class="name">金额</span>
          <el-input v-model="infoPark[2]"></el-input>
        </span>
      </div>
      <div class="list">
        <span class="child">
          <span class="name">附加说明</span>
          <el-input v-model="infoPark[3]" type="textarea"></el-input>
        </span>
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
      name: "",
      value: "",
      value1: "",
      multipleSelection: [],
      currentPage4: 1,
      showDoor: true,
      roomId: "",
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
      ],
      tableData: [
        {
          i: 1,
          name: "王鸿",
          sex: "男",
          idCard: 440777199002020508,
          phone: 13344449999,
          status: "已绑定",
        },
        {
          i: 2,
          name: "王鸿",
          sex: "男",
          idCard: 440777199002020508,
          phone: 13344449999,
          status: "已绑定",
        },
      ],
      tableData2: [
        {
          name: "王鸿",
          roomId: "A栋0205",
          tip: "车位物业停车费",
          fee: "¥ 3541.23",
          time: "2020-4-12  12:30",
          status: "待缴费",
          payTime: "2020-5-1 14:10",
          payName: "王晶",
          payType: "微信支付",
        },
        {
          name: "王鸿",
          roomId: "A栋0205",
          tip: "车位物业停车费",
          fee: "¥ 3541.23",
          time: "2020-4-12  12:30",
          status: "待缴费",
          payTime: "2020-5-1 14:10",
          payName: "王晶",
          payType: "微信支付",
        },
      ],
      info: [
        {
          name: "缴费房号:",
          val: "元邦山清水秀花园1栋205",
        },
        {
          name: "业主姓名:",
          val: "王鸿",
        },
        {
          name: "手机:",
          val: "13344449999",
        },
        {
          name: "累计缴费:",
          val: "¥ 12468.23元",
        },
        {
          name: "历史未缴:",
          val: "¥ 1358.24",
        },
        {
          name: "绑定家人:",
          val: "3人",
        },
      ],
      addAlert: false,
      infoPark: [],
      ppList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit() {
      this.showDoor = false;
    },
  },
};
</script>

<style lang="less">
#fuOnlinePayT {
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
      }
      .el-input {
        flex: 1;
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
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
  .el-dialog {
    .el-dialog__header {
      padding: 20px 0;
      text-align: center;
      margin: 0 20px;
      border-bottom: 1px dashed rgb(219, 219, 219);
    }
    .list {
      display: flex;
      align-items: center;
      // justify-content: center;
      margin-bottom: 20px;
      .child {
        display: flex;
        align-items: center;
        margin: 0 30px;
        .name {
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }
        .el-input {
          width: 200px;
        }
        .el-textarea__inner {
          width: 500px;
        }
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      .el-button {
        width: 110px;
      }
    }
  }
}
</style>